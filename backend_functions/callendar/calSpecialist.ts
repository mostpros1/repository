import { addAvailibility } from "../addData.ts";
import * as aws from "aws-sdk";

const dynamo = new aws.DynamoDB.DocumentClient();

export function calSpecialist(professional_id: number, job_description: string, date: Date, time_from: string, time_to: string) {


    const id: number = Math.random();

    dynamo
        .query({
            TableName: 'availibility',
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': id,
            }
        })
        .promise()
        .then(data => console.log(data.Items))
        .catch(console.error);

    /*if (console.error == "id not found") {
        addAvailibility(id, professional_id, job_description, date, time_from, time_to);
    }*/
}
/*dynamo
    .query({
        TableName: 'professionals',
        KeyConditionExpression: 'id = :professional_id',
        ExpressionAttributeValues: {
            ':professional_id': professional_id,
        }
    })
    .promise()
    .then(prof => console.log(prof.Items))
    .catch(console.error);*/


