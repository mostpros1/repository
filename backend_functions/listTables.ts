import { dynamoDB } from './declarations.ts';

export function listTables() {
  dynamoDB
    .listTables({})
    .promise()
    .then(data => console.log(data))
    .catch(console.error)
}