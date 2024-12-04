import { RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { ToastContainer } from 'react-toastify'
import ReactDOM from 'react-dom/client'
import { router } from './routes.jsx'
import '@src/index.css'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />

    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      pauseOnFocusLoss={false}
    />
  </StrictMode>
)
