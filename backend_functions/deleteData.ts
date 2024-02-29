import { dynamo } from './declerations.ts';

export function deleteData(tableName: string, key: string, value: string) {
  dynamo
    .delete({
      TableName: tableName,
      Key: {
        [key]: value,
      },
    })
    .promise()
    .then(data => console.log(data.Attributes))
    .catch(console.error)
}


