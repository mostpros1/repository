import { Amplify } from 'aws-amplify';
import { Provider } from 'react-redux';
import store from './store';
import awsExports from './aws-exports.js';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
