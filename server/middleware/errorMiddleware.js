export const notFound = (request, response, next) => {
  response.status(404)
  next(new Error(`Route not found: ${request.originalUrl}`))
}

export const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode

  response.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack
  })
}
