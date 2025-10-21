import ReactDOM,{ createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AuthProvider from './context/AuthContext';
 import { ToastContainer} from 'react-toastify';
 import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
        <App />
        <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        
        />
        <Toaster 
         toastOptions={{
    style: {
     background: '#363636',
      color: 'white',
      borderRadius: '10px',
      padding: '14px 18px',
      fontWeight: 'bold',
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    },
  }}
        />
  </AuthProvider>
   
  </BrowserRouter>,
)
  