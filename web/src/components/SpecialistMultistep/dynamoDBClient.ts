import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: 'JouwAccessKeyID',
  secretAccessKey: 'JouwSecretAccessKey',
});

export const dynamoDb = new AWS.DynamoDB.DocumentClient();