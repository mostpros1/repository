import { dynamo } from './declarations.ts';

export function updateData(TableName: string, Key: any, UpdateExpression: string, ExpressionAttributeValues: any) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: TableName,
      Key: Key,
      UpdateExpression: UpdateExpression,
      ExpressionAttributeValues: ExpressionAttributeValues,
    };
    dynamo.update(params, function (err, data) {
      if (err) {
        console.error('Unable to update. Error:', JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log('Update succeeded:', JSON.stringify(data, null, 2));
        resolve(data);
      }
    });
  });
}