import { Amplify, Auth } from "aws-amplify";
import awsExports from "./aws-exports.js";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import aws from "aws-sdk";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/nl.js";
import { UserProvider } from "./context/UserContext.js";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

Amplify.configure(awsExports);
Auth.configure(awsExports);

aws.config.update({
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_AWS_REGION,
});

export const dynamoDB = new aws.DynamoDB();

function test() {
  dynamoDB.listTables({}, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
}

function createTableAvailibility() {
  dynamoDB.createTable({
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S"
      },
      {
        AttributeName: "name",
        AttributeType: "S"
      },
      {
        AttributeName: "surname",
        AttributeType: "S"
      },
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'name',
        KeyType: 'RANGE',
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    TableName: "TimonTestTable",
    GlobalSecondaryIndexes: [
      {
        IndexName: "surname-index",
        KeySchema: [
          {
            AttributeName: "surname",
            KeyType: "HASH"
          }
        ],
        Projection: {
          ProjectionType: "ALL"
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      }
    ]
  })
    .promise()
    .then(data => console.log('Table created', data))
    .catch(err => console.error('Error creating table', err));
}

function deleteTable() {
  dynamoDB.deleteTable({
    TableName: "TimonTestTable",
  })
    .promise()
    .then(() => console.log("Table has been deleted"))
    .catch(console.error)
}

function editTable() {

const dynamo = new aws.DynamoDB.DocumentClient();

dynamo
  .put({
    Item: {
      id: "12346",
      name: "Timon",
      surname: "Heidenreich",
    },
    TableName: "TimonTestTable",
  })
  .promise()
  .then(data => console.log(data.Attributes))
  .catch(console.error)

}


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nl">
          <App />
          <button onClick={test}>read</button>
          <button onClick={createTableAvailibility}>create</button>
          <button onClick={deleteTable}>delete</button>
          <button onClick={editTable}>edit</button>
        </LocalizationProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
