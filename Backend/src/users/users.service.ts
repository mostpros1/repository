import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import ddbConnection from 'src/db/client';
import {
    CreateTableCommandInput,
    CreateTableCommandOutput,
    DeleteItemCommandInput,
    DeleteItemCommandOutput,
    GetItemCommandInput,
    GetItemCommandOutput,
    PutItemCommandInput,
    PutItemCommandOutput,
    QueryCommandInput,
    QueryCommandOutput,
    UpdateItemCommandInput,
    UpdateItemCommandOutput,
    waitUntilTableExists,
} from '@aws-sdk/client-dynamodb';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    // Create
    async addUser(user: User): Promise<CreateTableCommandOutput | PutItemCommandOutput> {
        if (!await ddbConnection.listTables({}).then((result) => result.TableNames.includes('Users'))) {
            const createTableCommand: CreateTableCommandInput = {
                TableName: 'Users',
                KeySchema: [
                    { AttributeName: 'userId', KeyType: 'HASH' }
                ],
                ProvisionedThroughput: { ReadCapacityUnits: 4, WriteCapacityUnits: 4 },
                AttributeDefinitions: [
                    { AttributeName: 'userId', AttributeType: 'S' },
                    { AttributeName: 'email',  AttributeType: 'S' }
                ],
                GlobalSecondaryIndexes: [{
                    IndexName: 'UsersEmail',
                    KeySchema: [{ AttributeName: 'email', KeyType: 'HASH' }],
                    Projection: { ProjectionType: "ALL" },
                    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
                }]
            };

            let createTableResult: CreateTableCommandOutput;
            await ddbConnection.createTable(createTableCommand).then(result => createTableResult = result);
            const result = await waitUntilTableExists({ client: ddbConnection, maxWaitTime: 100 }, { TableName: 'Users' });
            if (result.state !== "SUCCESS") return createTableResult;
        }

        // Hash password before putting it in the database
        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        const params: PutItemCommandInput = {
            TableName: 'Users',
            Item: {
                userId:         { S: user.userId },
                firstName:      { S: user.firstName },
                lastName:       { S: user.lastName },
                email:          { S: user.email },
                password:       { S: hashedPassword },
                emailVerified:  { BOOL: false }
            }
        }
    
        let putResult: PutItemCommandOutput;
        await ddbConnection.putItem(params)
            .catch(err => putResult = err)
            .then(result => putResult = result)
        return putResult;
    }

    // Read
    async getUserByUserId(userId: string): Promise<GetItemCommandOutput> {
        const params: GetItemCommandInput = {
            TableName: 'Users',
            Key: {
                userId: { S: userId }
            }
        }

        let getResult: GetItemCommandOutput;
        await ddbConnection.getItem(params)
            .catch(err => getResult = err)
            .then(result => getResult = result)
        return getResult;
    }

    async getUserByEmail(email: string): Promise<QueryCommandOutput> {
        const params: QueryCommandInput = {
            TableName: 'Users',
            IndexName: 'UsersEmail',
            KeyConditionExpression: "email = :userEmail",
            ExpressionAttributeValues: { ":userEmail": { S: email } }
        }

        let getResult: QueryCommandOutput;
        await ddbConnection.query(params)
            .catch(err => getResult = err)
            .then(result => getResult = result)
        return getResult;
    }


    // Update
    async updateUser(user: User): Promise<UpdateItemCommandOutput> {
        let UpdateExpression = "SET";
        let ExpressionAttributeNames = {};
        let ExpressionAttributeValues = {};

        let userId = user.userId;
        delete user.userId;

        for (const property in user) {
            UpdateExpression += ` #${property} = :${property},`;
            ExpressionAttributeNames[`#${property}`] = property;
            ExpressionAttributeValues[`:${property}`] = { S: user[property] };
        }

        UpdateExpression = UpdateExpression.slice(0, -1);

        const params: UpdateItemCommandInput = {
            TableName: 'Users',
            Key: {
                userId: { S: userId }
            },
            UpdateExpression,
            ExpressionAttributeNames,
            ExpressionAttributeValues,
            ReturnValues: "ALL_NEW"
        }

        let updateResult: UpdateItemCommandOutput;
        await ddbConnection.updateItem(params)
            .catch(err => updateResult = err)
            .then(result => updateResult = result)
        return updateResult;
    }

    // Delete
    async removeUserByUserId(userId: string): Promise<DeleteItemCommandOutput> {
        const params: DeleteItemCommandInput = {
            TableName: 'Users',
            Key: {
                userId: { S: userId }
            }
        }

        let deleteResult: DeleteItemCommandOutput;
        await ddbConnection.deleteItem(params)
            .catch(err => deleteResult = err)
            .then(result => deleteResult = result)
        return deleteResult;
    }
}
