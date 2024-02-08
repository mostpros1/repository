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
              AttributeName: "date",
              AttributeType: "S"
          },
          {
              AttributeName: "time-to",
              AttributeType: "S"
          },
          {
              AttributeName: "time-from",
              AttributeType: "S"
          },
          {
              AttributeName: "specialistId",
              AttributeType: "N"
          }
      ],
      KeySchema: [
          {
              AttributeName: 'specialist',
              KeyType: 'HASH'
          }
      ],
      ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
      },
      TableName: 'availability'
  })
      .promise()
      .then(data => console.log('Table created', data))
      .catch(err => console.error('Error creating table', err));
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nl">
          <App />
          <button onClick={test}>Test</button>
          <button onClick={createTableAvailibility}>write</button>
        </LocalizationProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
