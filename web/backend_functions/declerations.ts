import aws from 'aws-sdk';


export const dynamoDB = new aws.DynamoDB({ region: "eu-north-1" });

export const dynamo = new aws.DynamoDB.DocumentClient({ region: "eu-north-1" });
