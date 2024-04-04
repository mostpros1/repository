const aws = require('aws-sdk');


const DynamoDB = aws.DynamoDB.DocumentClient;


function delAvailibility(professionalEmail, date, time) {
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
        DynamoDB.delete({
            TableName: "availibility",
            Key: {
                id: data[0].id,
            },
        }).promise().then(deldata => console.log(deldata.Attributes)).catch(console.error)
    }).catch((error) => {
        console.error('Error:', error);
    });

}

const professionalEmail = 'email@email.com';
const date = '2022-01-01';
const time = '10:30'


delAvailibility(professionalEmail, date, time);