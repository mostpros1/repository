//const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB({ region: 'eu-east-1' });


function createTableAvailibility() {
    dynamoDB.createTable({
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
}


function insertData(datum: string, timeTo: string, timeFrom: string, specialistId: number) {
    const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'eu-east-1' });
    dynamo.put({
        Item: {
            date: datum,
            'time-to': timeTo,
            'time-from': timeFrom,
            specialistId,
        },
        TableName: 'availability',
    })
        .promise()
        .then(data => data.Attributes)
        .catch(console.error);
}


dynamoDB.scan({
    TableName: 'my-table',
}, (err) => {
    if (err) {
        console.error(err);
        createTableAvailibility();
    } else {
        insertData('2021-01-01', '12:00', '13:00', 123);
    }
});
