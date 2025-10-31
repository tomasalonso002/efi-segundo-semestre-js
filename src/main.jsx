import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css';
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <ToastContainer position='top-righ' autoClose={1500} />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
