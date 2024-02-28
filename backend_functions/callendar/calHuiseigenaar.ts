import aws from 'aws-sdk';

const dynamo = new aws.DynamoDB.DocumentClient();


export function calHuiseigenaar(professionalsEmail: string) {
    //const professional_id: number = data[0].items;

    function checkAvailibility(professional_id: number) {
        dynamo
            .query({
                TableName: 'availibility',
                KeyConditionExpression: 'professional_Id = :professional_id',
                ExpressionAttributeValues: {
                    ':professional_id': professional_id,
                }
            })
            .promise()
            .then(available => mark_availibility(available.Items))
            .catch(console.error);

    }

    dynamo
        .query({
            TableName: 'professionals',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': professionalsEmail,
            }
        })
        .promise()
        .then(data => checkAvailibility(data[0].items))
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
        return availibility;
    }
}
calHuiseigenaar("something");