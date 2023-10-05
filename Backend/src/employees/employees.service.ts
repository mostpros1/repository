import { Injectable } from '@nestjs/common';
import { Employee } from './entities/employees.entity';
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
export class EmployeesService {

    // Create
    async addEmployee(employee: Employee): Promise<CreateTableCommandOutput | PutItemCommandOutput> {
        if (!await ddbConnection.listTables({}).then((result) => result.TableNames.includes('Employees'))) {
            const createTableCommand: CreateTableCommandInput = {
                TableName: 'Employees',
                KeySchema: [
                    { AttributeName: 'userId', KeyType: 'HASH' }
                ],
                ProvisionedThroughput: { ReadCapacityUnits: 4, WriteCapacityUnits: 4 },
                AttributeDefinitions: [
                    { AttributeName: 'userId',    AttributeType: 'S' },
                    { AttributeName: 'email',     AttributeType: 'S' }
                ],
                GlobalSecondaryIndexes: [{
                    IndexName: 'EmployeesEmail',
                    KeySchema: [
                        { AttributeName: 'email', KeyType: 'HASH' }
                    ],
                    Projection: { ProjectionType: "ALL" },
                    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
                }]
            };

            let createTableResult: CreateTableCommandOutput;
            await ddbConnection.createTable(createTableCommand).then(result => createTableResult = result);
            const result = await waitUntilTableExists({ client: ddbConnection, maxWaitTime: 100 }, { TableName: 'Employees' });
            if (result.state !== "SUCCESS") return createTableResult;
        }

        // Hash password before putting it in the database
        const hashedPassword = await bcrypt.hash(employee.password, 10);
        
        const params: PutItemCommandInput = {
            TableName: 'Employees',
            Item: {
                userId:    { S: employee.userId },
                firstName: { S: employee.firstName },
                lastName:  { S: employee.lastName },
                email:     { S: employee.email },
                password:  { S: hashedPassword }
            }
        }
    
        let putResult: PutItemCommandOutput;
        await ddbConnection.putItem(params)
            .catch(err => putResult = err)
            .then(result => putResult = result)
        return putResult;
    }

    // Read
    async getEmployeeByUserId(userId: string): Promise<GetItemCommandOutput> {
        const params: GetItemCommandInput = {
            TableName: 'Employees',
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

    async getEmployeeByEmail(email: string): Promise<QueryCommandOutput> {
        const params: QueryCommandInput = {
            TableName: 'Employees',
            IndexName: 'EmployeesEmail',
            KeyConditionExpression: "email = :employeeEmail",
            ExpressionAttributeValues: { ":employeeEmail": { S: email } }
        }

        let getResult: QueryCommandOutput;
        await ddbConnection.query(params)
            .catch(err => getResult = err)
            .then(result => getResult = result)
        return getResult;
    }


    // Update
    async updateEmployee(employee: Employee): Promise<UpdateItemCommandOutput> {
        let UpdateExpression = "SET";
        let ExpressionAttributeNames = {};
        let ExpressionAttributeValues = {};

        let userId = employee.userId;
        delete employee.userId;

        for (const property in employee) {
            UpdateExpression += ` #${property} = :${property},`;
            ExpressionAttributeNames[`#${property}`] = property;
            ExpressionAttributeValues[`:${property}`] = { S: employee[property] };
        }

        UpdateExpression = UpdateExpression.slice(0, -1);

        const params: UpdateItemCommandInput = {
            TableName: 'Employees',
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
    async removeEmployeeByUserId(userId: string): Promise<DeleteItemCommandOutput> {
        const params: DeleteItemCommandInput = {
            TableName: 'Employees',
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
