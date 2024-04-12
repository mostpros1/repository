import { dynamo } from "./declarations.ts";
import { cognitoIdentityServiceProvider } from "./declarations.ts";

export function deleteAccount(email, Token, userType) {
   
    //delete user from cognito
    const params = {
        AccessToken: Token,
    };

    cognitoIdentityServiceProvider.getUser(params, function (err, data) {
        if (err) {
            console.log('Error:', err);
        } else {
            const username = data.Username;
            console.log('Username:', username);
            const Params = {
                UserPoolId: 'YOUR_USER_POOL_ID',
                Username: username,
            };

            cognitoIdentityServiceProvider.adminDeleteUser(Params, function (err, data) {
                if (err) {
                    console.log('Error:', err);
                } else {
                    console.log('User deleted successfully');
                }
            });
        }
    });

    //delete the user from database
    if (userType == "HOMEOWNER") {
        dynamo
            .query({
                TableName: 'users',
                IndexName: 'Username',
                KeyConditionExpression: 'email = :email',
                ExpressionAttributeValues: {
                    ':email': email
                }
            })
            .promise()
            .then(data =>
                dynamo
                    .delete({
                        TableName: "Users",
                        Key: {
                            id: data.Items[0].id,
                        },
                    })
                    .promise()
                    .then(data => console.log(data.Attributes))
                    .catch(console.error)
            ).catch(console.error);
    } else if (userType == "PROFESSIONAL") {

        dynamo
            .query({
                TableName: 'Professionals',
                IndexName: 'emailIndex',
                KeyConditionExpression: 'email = :email',
                ExpressionAttributeValues: {
                    ':email': email
                }
            })
            .promise()
            .then(data =>
                dynamo
                    .delete({
                        TableName: "Professionals",
                        Key: {
                            id: data.Items[0].id,
                        },
                    })
                    .promise()
                    .then(data => console.log(data.Attributes))
                    .catch(console.error)
            ).catch(console.error);
    }else{
        console.log("User type not found");
    }
}