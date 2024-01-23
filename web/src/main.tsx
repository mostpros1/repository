import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { UserProvider } from './context/UserContext.js';
import 'dayjs/locale/nl.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='nl'>
          <App />
        </LocalizationProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
