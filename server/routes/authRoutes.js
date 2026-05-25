import express from 'express'
import { getProfile, loginUser, registerUser, updateProfile } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.route('/profile').get(protect, getProfile).put(protect, updateProfile)

export default router
