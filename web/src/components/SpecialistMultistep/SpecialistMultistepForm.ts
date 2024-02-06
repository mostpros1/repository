//const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB({ region: 'eu-east-1' });

dynamodb.createTable({
    AttributeDefinitions: [
        {
            AttributeName: "date",
            AttributeType: "S"
        },
        {
            AttributeName: "time-to",
            AttributeType: "S"
        },
        {
            AttributeName: "time-from",
            AttributeType: "S"
        },
        {
            AttributeName: "specialistId",
            AttributeType: "N"
        }
    ],
    KeySchema: [
        {
            AttributeName: 'specialist',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'availability'
})
.promise()
.then(data => console.log('Table created', data))
.catch(err => console.error('Error creating table', err));

const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'eu-east-1' });

dynamo.put({
    Item: {
       date: '2021-01-01',
       'time-to': '12:00',
       'time-from': '13:00',
       specialistId: '123',
    },
    TableName: 'availability',
})
.promise()
.then(data => console.log(data.Attributes))
.catch(console.error);
