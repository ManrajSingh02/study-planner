import jwt from 'jsonwebtoken'

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '7d'
  })
}

export default createToken
