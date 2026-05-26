import { createContext, useContext, useState } from 'react'
import { NotificationContext } from './NotificationContext'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api'
const API_URL = API_BASE_URL.endsWith('/api')
  ? API_BASE_URL
  : `${API_BASE_URL.replace(/\/$/, '')}/api`

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const { notify } = useContext(NotificationContext)

  const authRequest = async (path, options = {}) => {
    const response = await fetch(`${API_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        ...options.headers
      },
      ...options
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Request failed')
    }

    return data
  }

  const login = ({ email, password }) => {
    return authRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
      .then((data) => {
        setUser(data)
        notify({
          title: 'Login successful',
          message: `Welcome back, ${data.name}.`,
          tone: 'success'
        })
        return data
      })
  }

  const register = ({ name, email, password }) => {
    return authRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    })
      .then((data) => {
        setUser(data)
        notify({
          title: 'Account created',
          message: 'Your study planner is ready.',
          tone: 'success'
        })
        return data
      })
  }

  const logout = () => {
    notify({
      title: 'Logged out',
      message: 'Your session has ended.',
      tone: 'info'
    })
    setUser(null)
  }

  const updateUser = (updates) => {
    setUser((current) => ({ ...current, ...updates }))

    if (!user?.token) return

    authRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
      .then(setUser)
      .catch((error) => console.error(error.message))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, apiUrl: API_URL }}>
      {children}
    </AuthContext.Provider>
  )
}
