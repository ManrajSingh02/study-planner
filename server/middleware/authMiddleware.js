import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      response.status(401)
      throw new Error('Not authorized, token missing')
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')

    request.user = await User.findById(decoded.userId).select('-password')

    if (!request.user) {
      response.status(401)
      throw new Error('Not authorized, user not found')
    }

    next()
  } catch (error) {
    response.status(response.statusCode === 200 ? 401 : response.statusCode)
    next(error)
  }
}
