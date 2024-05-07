import { dynamo } from "./declarations.ts";

function setUserName(userName: string, email: string) {
    dynamo.put({
        TableName: 'Usernames',
        Item: {
            "id": Math.floor(Math.random() * 1000000),
            'username': userName,
            "email": email
        }
    });
}

function getUserName(userName: string) {
    dynamo.query({
        TableName: 'Usernames',
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':username': userName
        }
    }).then((res) => {
        console.log(res);
    });

}