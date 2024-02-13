import aws from 'aws-sdk';


export const dynamoDB = new aws.DynamoDB();

export const dynamo = new aws.DynamoDB.DocumentClient()

