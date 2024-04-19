import { dynamoDB } from './declarations.ts';
import { dynamo } from './declarations.ts';
import aws from "aws-sdk";

export function scanItem(tableName: string, filterExpression: string) {
    dynamoDB.scan({
      TableName: tableName,
      FilterExpression:
        filterExpression,
    })
    .promise()
    .then(data => console.log(data.Items))
    .catch(console.error)
}

export function queryGSI(
  tableName: string,
  indexName: string,
  keyConditionExpression: string,
  expressionAttributeValues: aws.DynamoDB.DocumentClient.ExpressionAttributeValueMap
){
   dynamoDB.query({
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttributeValues,
  })
  .promise()
  .then(data => console.log(data.Items))
  .catch(error => { throw error; });
}

export function queryItem(
  tableName: string,
  keyConditionExpression: string,
  expressionAttributeValues: aws.DynamoDB.DocumentClient.ExpressionAttributeValueMap
) {
  dynamoDB.query({
    TableName: tableName,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttributeValues,
  })
  .promise()
  .then(data => console.log(data.Items))
  .catch(console.error);
}


export function getItem(tableName: string, ID: string) {

dynamo
  .get({
    TableName: tableName,
    Key: {
      id: ID, // id is the Partition Key, '123' is the value of it
    },
  })
  .promise()
  .then(data => ({ Item: data.Item }))
  .catch(console.error)
}