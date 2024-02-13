import AWS from 'aws-sdk';

AWS.config.update({
  region: 'jouw-regio',
  // credentials indien nodig, aanbevolen via Cognito voor frontend applicaties
});

export const dynamoDb = new AWS.DynamoDB.DocumentClient();