<<<<<<< HEAD:backend_functions/declerations.ts
import aws from "aws-sdk";
=======
import aws from 'aws-sdk';

export const cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider();

export const SES = new aws.SES({
    region: import.meta.env.VITE_AWS_REGION,
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
});
>>>>>>> ff283c8d73cf88d1b6ed875c719c3b9881c98657:web/declarations.ts

export const dynamoDB = new aws.DynamoDB({
    region: import.meta.env.VITE_AWS_REGION,
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
});

export const dynamo = new aws.DynamoDB.DocumentClient({
    region: import.meta.env.VITE_AWS_REGION,
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
});
