import { dynamoDB } from './declerations.ts';

export function listTables() {
  dynamoDB
    .listTables({})
    .promise()
    .then(data => console.log(data))
    .catch(console.error)
}