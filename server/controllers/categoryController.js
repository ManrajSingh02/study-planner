import Category from '../models/Category.js'

export const getCategories = async (request, response, next) => {
  try {
    const categories = await Category.find({ user: request.user._id }).sort({ name: 1 })
    response.json(categories)
  } catch (error) {
    next(error)
  }
}

export const createCategory = async (request, response, next) => {
  try {
    const { name, color, goal } = request.body

    if (!name) {
      response.status(400)
      throw new Error('Category name is required')
    }

    const category = await Category.create({
      user: request.user._id,
      name,
      color,
      goal
    })

    response.status(201).json(category)
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = async (request, response, next) => {
  try {
    const category = await Category.findOne({
      _id: request.params.id,
      user: request.user._id
    })

    if (!category) {
      response.status(404)
      throw new Error('Category not found')
    }

    await category.deleteOne()
    response.json({ message: 'Category deleted' })
  } catch (error) {
    next(error)
  }
}
