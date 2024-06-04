import Stripe from 'stripe';
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
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AvailabilityProvider } from './AvailabilityContext';


aws.config.update({
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_AWS_REGION,
});

import { dynamoDB } from "../declarations.ts";


dynamoDB
  .listTables()
  .promise()
  .then(data => console.log(data))
  .catch((error: Error) => console.error(error));

export const cognitoClient = new aws.CognitoIdentityServiceProvider();
Amplify.configure(awsExports);
Auth.configure(awsExports);
export const stripeClient = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

//sendMail("timon@timonheidenreich.eu", "test", "test", "<p>test</p><br><p>test</p>");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nl">
          <I18nextProvider i18n={i18n}>
            <AvailabilityProvider>
              <App />
            </AvailabilityProvider>
          </I18nextProvider>
        </LocalizationProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode >
);

export { dynamoDB };
