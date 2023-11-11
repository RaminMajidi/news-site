import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bulma/css/bulma.css'
import './index.css'
import "boxicons"
import { AdminContextProvider } from '@src/admin/context/context.jsx'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { HomeContextProvider } from '@src/context/context.jsx'
import App from './App'



// axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <HomeContextProvider>
          <App />
        </HomeContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
