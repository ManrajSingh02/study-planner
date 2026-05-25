import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import { ThemeProvider } from './context/ThemeContext'
import { NotificationProvider } from './context/NotificationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <TaskProvider>
              <App />
            </TaskProvider>
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
