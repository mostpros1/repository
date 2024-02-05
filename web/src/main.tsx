import { Amplify, Auth } from 'aws-amplify';
import aws from 'aws-sdk'
import awsExports from './aws-exports.js';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import Stripe from 'stripe';
import { BrowserRouter } from 'react-router-dom' 
import './index.css'

aws.config.update({
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_AWS_REGION,
});

export const cognitoClient = new aws.CognitoIdentityServiceProvider();
Amplify.configure(awsExports);
Auth.configure(awsExports);

export const stripeClient = new Stripe(import.meta.env.VITE_STRIPE_TEST_KEY);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter> 
  </React.StrictMode>,
)
