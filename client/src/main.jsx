import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bulma/css/bulma.css'
import './index.css'
import "boxicons"
import { AdminContextProvider } from './admin/context/context.jsx'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
