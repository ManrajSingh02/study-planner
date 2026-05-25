import Task from '../models/Task.js'

export const getTasks = async (request, response, next) => {
  try {
    const tasks = await Task.find({ user: request.user._id }).sort({ pinned: -1, deadline: 1 })
    response.json(tasks)
  } catch (error) {
    next(error)
  }
}

export const createTask = async (request, response, next) => {
  try {
    const task = await Task.create({
      ...request.body,
      user: request.user._id
    })

    response.status(201).json(task)
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (request, response, next) => {
  try {
    const task = await Task.findOne({ _id: request.params.id, user: request.user._id })

    if (!task) {
      response.status(404)
      throw new Error('Task not found')
    }

    const updatedTask = await Task.findByIdAndUpdate(task._id, request.body, {
      new: true,
      runValidators: true
    })

    response.json(updatedTask)
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (request, response, next) => {
  try {
    const task = await Task.findOne({ _id: request.params.id, user: request.user._id })

    if (!task) {
      response.status(404)
      throw new Error('Task not found')
    }

    await task.deleteOne()
    response.json({ message: 'Task deleted' })
  } catch (error) {
    next(error)
  }
}
