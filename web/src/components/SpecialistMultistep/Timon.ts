// import { dynamoDB } from '../../main.tsx';


//     dynamoDB.listTables({}, (err, data) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(data);
//         }
//     });


/*function createTableAvailibility() {
    dynamoDB.createTable({
        AttributeDefinitions: [
            {
                AttributeName: "date",
                AttributeType: "S"
            },
            {
                AttributeName: "time_to",
                AttributeType: "S"
            },
            {
                AttributeName: "time_from",
                AttributeType: "S"
            },
            {
                AttributeName: "professional_id",
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

    return dynamoDB.putItem({
        Item: {
            'date': { S: datum },
            'time-to': { S: timeTo },
            'time-from': { S: timeFrom },
            'specialistId': { N: specialistId.toString() },
        },
        TableName: 'availability',
    })
        .promise()
        .then(data => data.Attributes)
        .catch(console.error);
}


dynamoDB.scan({
    TableName: 'availability',
}, (err) => {
    if (err) {
        console.error(err);
        createTableAvailibility();
    } else {
        insertData('2021-01-01', '12:00', '13:00', 123);
    }
});
*/
