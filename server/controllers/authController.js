import User from '../models/User.js'
import createToken from '../utils/createToken.js'

const sendUserResponse = (response, user, statusCode = 200) => {
  response.status(statusCode).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    notes: user.notes,
    goals: user.goals,
    token: createToken(user._id)
  })
}

export const registerUser = async (request, response, next) => {
  try {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
      response.status(400)
      throw new Error('Name, email, and password are required')
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
      response.status(400)
      throw new Error('User already exists')
    }

    const user = await User.create({ name, email, password })
    sendUserResponse(response, user, 201)
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (request, response, next) => {
  try {
    const { email, password } = request.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      sendUserResponse(response, user)
      return
    }

    response.status(401)
    throw new Error('Invalid email or password')
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (request, response) => {
  response.json(request.user)
}

export const updateProfile = async (request, response, next) => {
  try {
    const user = await User.findById(request.user._id)

    if (!user) {
      response.status(404)
      throw new Error('User not found')
    }

    if (request.body.name !== undefined) {
      user.name = request.body.name
    }

    if (request.body.notes !== undefined) {
      user.notes = request.body.notes
    }

    if (request.body.goals !== undefined) {
      user.goals = {
        ...user.goals.toObject(),
        ...request.body.goals
      }
    }

    const updatedUser = await user.save()

    sendUserResponse(response, updatedUser)
  } catch (error) {
    next(error)
  }
}
