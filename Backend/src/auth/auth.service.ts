import {
    CreateTableCommandInput,
    CreateTableCommandOutput,
    DeleteItemCommandInput,
    DeleteItemCommandOutput,
    GetItemCommandInput,
    GetItemCommandOutput, 
    PutItemCommandInput,
    PutItemCommandOutput,
    UpdateItemCommandOutput,
    waitUntilTableExists,
} from '@aws-sdk/client-dynamodb';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import ddbConnection from 'src/db/client';
import * as bcrypt from 'bcrypt';
import { unmarshall } from '@aws-sdk/util-dynamodb';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async createSessionToken(userId: string, firstName: string, lastName: string): Promise<{access_token: string}> {
        const payload = { user: userId, firstName, lastName };
        return { access_token: await this.jwtService.signAsync(payload) };
    }

    async createEmailVerificationCode(userId: string): Promise<CreateTableCommandOutput | PutItemCommandOutput> {
        if (!await ddbConnection.listTables({}).then((result) => result.TableNames.includes('EmailVerificationCodes'))) {
            const createTableCommand: CreateTableCommandInput = {
                TableName: 'EmailVerificationCodes',
                KeySchema: [{ AttributeName: 'verificationCode', KeyType: 'HASH' }],
                ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
                AttributeDefinitions: [{ AttributeName: 'verificationCode', AttributeType: 'S' }]
            };        

            let createTableResult: CreateTableCommandOutput;
            await ddbConnection.createTable(createTableCommand).then(result => createTableResult = result);
            const result = await waitUntilTableExists({ client: ddbConnection, maxWaitTime: 100 }, { TableName: 'EmailVerificationCodes' });
            if (result.state !== "SUCCESS") return createTableResult;
        }
        
        const params: PutItemCommandInput = {
            TableName: 'EmailVerificationCodes',
            Item: {
                verificationCode: { S: crypto.randomUUID() },
                userId:           { S: userId }
            }
        }
    
        let putResult: PutItemCommandOutput;
        await ddbConnection.putItem(params)
            .catch(err => putResult = err)
            .then(result => putResult = result)
        return putResult;
    }

    async createPasswordResetCode(email: string) {
        if (!await ddbConnection.listTables({}).then((result) => result.TableNames.includes('PasswordResetCodes'))) {
            const createTableCommand: CreateTableCommandInput = {
                TableName: 'PasswordResetCodes',
                KeySchema: [{ AttributeName: 'resetCode', KeyType: 'HASH' }],
                ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
                AttributeDefinitions: [{ AttributeName: 'resetCode', AttributeType: 'S' }]
            };        

            let createTableResult: CreateTableCommandOutput;
            await ddbConnection.createTable(createTableCommand).then(result => createTableResult = result);
            const result = await waitUntilTableExists({ client: ddbConnection, maxWaitTime: 100 }, { TableName: 'PasswordResetCodes' });
            if (result.state !== "SUCCESS") return createTableResult;
        }

        const params: PutItemCommandInput = {
            TableName: 'PasswordResetCodes',
            Item: {
                resetCode: { S: crypto.randomUUID() },
                email:     { S: email }
            }
        }
    
        let putResult: PutItemCommandOutput;
        await ddbConnection.putItem(params)
            .catch(err => putResult = err)
            .then(result => putResult = result)
        return putResult;
    }

    async logIn(email: string, password: string): Promise<{access_token: string}> {
        const user = (await this.usersService.getUserByEmail(email)).Items[0];
        if (!await bcrypt.compare(password, user.password.S)) throw new UnauthorizedException();
        return this.createSessionToken(user.userId.S, user.firstName.S, user.lastName.S);
    }

    async signUp(user: User) {
        await this.usersService.addUser(user);
        await this.createEmailVerificationCode(user.userId);
        return this.createSessionToken(user.userId, user.firstName, user.lastName);
    }

    async verifyEmail(verificationCode: string) {
        const getParams: GetItemCommandInput = {
            TableName: 'EmailVerificationCodes',
            Key: {
                verificationCode: { S: verificationCode }
            }
        }
        let getResult: GetItemCommandOutput;
        await ddbConnection.getItem(getParams)
            .catch(err => getResult = err)
            .then(result => getResult = result)

        if (!getResult.Item) return "No matching user was found.";
        
        const userToVerify = unmarshall((await this.usersService.getUserByUserId(getResult.Item.userId.S)).Item) as User;
        userToVerify.emailVerified = true;

        let updateResult: UpdateItemCommandOutput;
        await this.usersService.updateUser(userToVerify)
            .catch(err => updateResult = err)
            .then(result => updateResult = result)
        if (!updateResult.Attributes) return updateResult;

        const deleteParams: DeleteItemCommandInput = {
            TableName: 'EmailVerificationCodes',
            Key: {
                verificationCode: { S: verificationCode }
            }
        }
        await ddbConnection.deleteItem(deleteParams);
        
        return `Verified user ${userToVerify.firstName} ${userToVerify.lastName} (User ID: ${userToVerify.userId})`;
    }

    async resetPassword(resetCode: string) {
        
    }
}
