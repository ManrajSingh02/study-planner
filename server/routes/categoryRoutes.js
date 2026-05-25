import express from 'express'
import { createCategory, deleteCategory, getCategories } from '../controllers/categoryController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getCategories).post(protect, createCategory)
router.route('/:id').delete(protect, deleteCategory)

export default router
