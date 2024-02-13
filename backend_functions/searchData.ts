import { dynamoDB } from "../main.tsx";
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
