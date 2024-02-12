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

function showTables() {
  dynamoDB.listTables({}, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
}

/*function createRoles() {

  // Define table parameters
  const para = {
    TableName: 'roles',
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' } // Primary key attribute
    ],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'N' }, // Define primary key attribute
      { AttributeName: 'name', AttributeType: 'S'}, // Define non-key attribute 'name'
      { AttributeName: 'description', AttributeType: 'S'},
      { AttributeName: 'created_at', AttributeType: 'S' },
      { AttributeName: 'updated_at', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  };

  // Create DynamoDB table
  dynamoDB.createTable(para, (err, data) => {
    if (err) {
      console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
    }
  });

}*/

function addTestUser(){

const params = {
  TableName: "users",
  Item: {
    id: { N: "1" },
    name: { S: "Timon" },
    email: { S: "timon@timonheidenreich.eu" }
  }
};

dynamoDB.putItem(params, function(err, data) {
  if (err) {
    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Added item:", JSON.stringify(data, null, 2));
  }
});
}


function deleteTable() {
  dynamoDB.deleteTable({
    TableName: "roles",
  })
    .promise()
    .then(() => console.log("Table has been deleted"))
    .catch(console.error)
}

function addToTable() {

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
          <button onClick={showTables}>Show Tables</button>
          <button onClick={addTestUser}>create</button>
          <button onClick={deleteTable}>delete</button>
          <button onClick={addToTable}>Add data</button>
        </LocalizationProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
