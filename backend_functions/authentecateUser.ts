import { dynamo } from "./declerations.ts";
import { comparePassword } from "./hashPassword.ts";


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

    dynamo.query(params, async function(err, data) {
        if (err) {
            console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
        } else {
            if (data.Items && data.Items.length === 0) {
                console.log('User not found.');
            } else {
                try {
                    const user = data.Items && data.Items[0];
                    if (user && user.password) {
                        const isPasswordCorrect = await comparePassword(password, user.password);
                        if (isPasswordCorrect) {
                            console.log('User authenticated!');
                            // Perform actions for a correct password
                        } else {
                            console.log('The password is incorrect.');
                            // Perform actions for an incorrect password
                        }
                    } else {
                        console.log('User not found or password is missing.');
                    }
                } catch (error) {
                    console.error('An error occurred while comparing passwords:', error);
                    // Handle the error appropriately
                }
            }
        }
    });
}