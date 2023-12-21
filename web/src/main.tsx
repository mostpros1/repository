import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports.js';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import { BrowserRouter } from 'react-router-dom' 
import './index.css'

Amplify.configure(awsExports);
Auth.configure(awsExports);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter> 
  </React.StrictMode>,
)
