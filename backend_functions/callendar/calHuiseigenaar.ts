import aws from 'aws-sdk';

const dynamo = new aws.DynamoDB.DocumentClient();


export function calHuiseigenaar(professionalsEmail: string) {
    //const professional_id: number = data[0].items;

    /*function checkAvailibility(professional_id: number) {
        dynamo
            .query({
                TableName: 'UserAvailability',
                IndexName: "professional_idIndex",
                KeyConditionExpression: 'professional_id = :professional_id',
                ExpressionAttributeValues: {
                    ':professional_id': professional_id,
                }
            })
            .promise()
            .then(available => mark_availibility(available.Items))
            .catch(console.error);

    }*/

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
        .then(data => mark_availibility(data.Items))
        .catch(console.error);




    function mark_availibility(output: any) {
        const availibility: any = [];
        for (let i = 0; i < output.length; i++) {
            let dates: string[] = [];
            for (let j = 0; j < output[i].availibility.length; j++) {
                dates = [...dates, output[i].availibility[j]];
            }
            //const date = output[i].availibility[];
            //const time_from = output[i].time_from;
            //const time_to = output[i].time_to;
            //const date_time = date + " " + time_from + " - " + time_to;
            if (output[i].status === "available") {
                console.log(dates, "are available");
                availibility.push(dates);
            }

        }
        return availibility;
    }
}
calHuiseigenaar("something");
