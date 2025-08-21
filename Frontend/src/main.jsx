import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Authentication } from './Context/Authentication.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authentication>
      <div className='dark:bg-slate-900 dark:text-white'>
        <App />
      </div>
    </Authentication>
  </React.StrictMode>,
)
