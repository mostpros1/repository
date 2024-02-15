import { ColorLensOutlined } from "@mui/icons-material";

const email: string = "something";


const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

dynamo
    .query({
        TableName: 'proffesionals',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email,
        }
    })
    .promise()
    .then(data => console.log(data.Items))
    .catch(console.error);


const professional_id: number = 1;


dynamo
    .query({
        TableName: 'availibility',
        KeyConditionExpression: 'professional_Id = :professional_id',
        ExpressionAttributeValues: {
            ':professional_id': professional_id,
        }
    })
    .promise()
    .then(data => mark_availibility(data.Items))
    .catch(console.error);


function mark_availibility(output: any) {
    const availibility: any = [];
    for (let i = 0; i < output.length; i++) {
        const date = output[i].date;
        const time_from = output[i].time_from;
        const time_to = output[i].time_to;
        const date_time = date + " " + time_from + " - " + time_to;
        if (output[i].status === "available") {
            console.log(date, "is available");
            availibility.push(date_time);
        }
    }
}