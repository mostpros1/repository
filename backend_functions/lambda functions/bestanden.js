const aws = require('aws-sdk');


const DynamoDB = aws.DynamoDB.DocumentClient;


function noname(professionalEmail, date, time) {
    DynamoDB.query({
        TableName: 'availibility',
        KeyConditionExpression: 'professionalEmail = :professionalEmail AND date = :date AND time = :time',
        ExpressionAttributeValues: {
            ':professionalEmail': professionalEmail,
            ':date': date,
            ':time': time,
        },
    }).promise().then((data) => {
        console.log('Success:', data);
    }).catch((error) => {
        console.error('Error:', error);
    });

}