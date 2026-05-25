import cors from 'cors'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.json({
    message: 'Study Planner backend is running',
    availableRoutes: ['/api/health', '/api/auth', '/api/tasks', '/api/categories']
  })
})

app.get('/api/health', (request, response) => {
  response.json({
    status: 'ok',
    service: 'study-planner-server'
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/tasks', taskRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
