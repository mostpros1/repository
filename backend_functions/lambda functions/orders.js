const aws = require('aws-sdk');


const DynamoDB = aws.DynamoDB.DocumentClient;

function createOrder(amountInCents, description, professionalEmail, userEmail, status) {

    DynamoDB.put({
        TableName: 'orders',
        Item: {
            id: Math.random().toString(36).substring(7),
            amount: amountInCents,
            description: description,
            professional_email: professionalEmail,
            user_email: userEmail,
            status: status,
        },
    }).promise().then(() => {
        console.log('Success');
    }).catch((error) => {
        console.error('Error:', error);
    });

}

createOrder(1000, 'Product purchase', 'email@email.com', 'email@email.com', 'pending');