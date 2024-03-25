import { dynamo } from './declerations.ts';
import { queryUsers } from './queryUsers.ts';

export async function addVerificationCodes(email: string) {
    const params = {
        TableName: 'verification_codes',
        Item: {
            id: Math.floor(Math.random() * 1000000000),
            email: email,
            code: Math.floor(100000 + Math.random() * 900000)
        },
    };
    dynamo.put(params);
}


function getVerificationCode(email: string, code: number): Promise<boolean | null> {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: "verification_codes",
            IndexName: 'codeIndex',
            KeyConditionExpression: 'code = :code',
            ExpressionAttributeValues: {
                ':code': code
            }
        };

        dynamo.query(params, function (err, data) {
            if (err) {
                console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
                reject(err);
            } else {
                if (data.Items && data.Items.length === 0) {
                    console.log('code not found.');
                    resolve(null);
                } else {
                    console.log(data.Items && data.Items[0].email);
                    if (data.Items && data.Items[0].email === email) {
                        resolve(true);
                    }

                }
            }
        });
    });
}

const verifiedEmail = "example@email.com"

getVerificationCode(verifiedEmail, 123456)
    .then(result => {
        if (result == true) {
            console.log("Verification code found: ", result);
            const id = queryUsers(verifiedEmail, "id");
            dynamo.update({
                TableName: "users",
                Key: {
                    id: id,
                },
                UpdateExpression: `set status = :status`,
                ExpressionAttributeValues: {
                    ":status": "verified",
                },
            })
                .promise()
                .then(data => console.log(data.Attributes))
                .catch(console.error)

        } else {

            console.log("No verification code found.");
        }
    })
    .catch(error => {
        console.error("An error occurred: ", error);
    });