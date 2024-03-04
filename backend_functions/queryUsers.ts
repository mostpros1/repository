import { dynamo } from './declerations.ts';

export async function queryUsers(username: string,  output: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: "users",
        IndexName: 'username',
        KeyConditionExpression: 'email = :username',
        ExpressionAttributeValues: {
          ':username': username
        }
      };

      dynamo.query(params, function (err, data) {
        if (err) {
          console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
          reject(err);
        } else {
          if (data.Items && data.Items.length === 0) {
            console.log('User not found.');
            resolve(null);
          } else {
            console.log(data.Items && data.Items[0][output]);
            resolve(data.Items && data.Items[0][output]);
          }
        }
      });
    });
  }