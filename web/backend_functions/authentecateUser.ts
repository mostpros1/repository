import { dynamo } from "./declerations.ts";

const tableName = 'users';

export function authenticateUser(username: string, password: string): void {
    const params = {
        TableName: tableName,
        IndexName: 'username', 
        KeyConditionExpression: 'email = :username',
        ExpressionAttributeValues: {
            ':username': username
        }
    };

    dynamo.query(params, function(err, data) {
        if (err) {
            console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
        } else {
            if (data.Items && data.Items.length === 0) {
                console.log('User not found.');
            } else {

                const user = data.Items && data.Items[0];
                if (user && user.password === hash(password)) { 
                    console.log('User authenticated!');
                   
                } else {
                    console.log('Incorrect password.');
                }
            }
        }
    });
}


function hash(password: string): string {
    // Your password hashing logic
    return password; 
}
