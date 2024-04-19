import * as aws from "aws-sdk";

const dynamo = new aws.DynamoDB.DocumentClient();

export function addAvailibility(professionalsEmail: string, dates: any[]) {


    dynamo
        .query({
            TableName: 'Professionals',
            IndexName: 'emailIndex',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': professionalsEmail,
            }
        })
        .promise()
        .then(data => dynamo
            .update({
                TableName: "Professionals",
                Key: {
                    id: data.Items[0].id,
                },
                UpdateExpression: `set availibility = :availibility`,
                ExpressionAttributeValues: {
                    ":availibility": [...data.Items[0].availibility, dates],
                },
            })
            .promise()
            .then(data => console.log(data.Attributes))
            .catch(console.error))
        .catch(console.error);
    /*if (console.error == "id not found") {
        addAvailibility(id, professional_id, job_description, date, time_from, time_to);
    }*/


}

export function changeAvailibility(professionalsEmail: string, dates: any[]) {


    const id: number = Math.random();

    dynamo
        .query({
            TableName: 'Professionals',
            IndexName: 'emailIndex',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': professionalsEmail,
            }
        })
        .promise()
        .then(data => dynamo
            .update({
                TableName: "Professionals",
                Key: {
                    id: data.Items[0].id,
                },
                UpdateExpression: `set availibility = :availibility`,
                ExpressionAttributeValues: {
                    ":availibility": [ dates],
                },
            })
            .promise()
            .then(data => console.log(data.Attributes))
            .catch(console.error))
        .catch(console.error);
    /*if (console.error == "id not found") {
        addAvailibility(id, professional_id, job_description, date, time_from, time_to);
    }*/


}