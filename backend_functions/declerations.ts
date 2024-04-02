import aws from 'aws-sdk';

export const SES = new aws.SES({
    region: import.meta.env.VITE_AWS_REGION,
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
});


export const dynamoDB = new aws.DynamoDB({
    region: process.env.VITE_AWS_REGION,
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY
});

export const dynamo = new aws.DynamoDB.DocumentClient({
    region: process.env.VITE_AWS_REGION,
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY
});
