import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: 'AKIATSWCCE2SXRH4YT6S',
  secretAccessKey: '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',
});

export const dynamoDb = new AWS.DynamoDB.DocumentClient();