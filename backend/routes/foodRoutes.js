import express from 'express'
const router = express.Router()
import {
  getFoods,
  getFoodById,
  deleteFood,
  createFood,
  updateFood,
  createFoodReview,
  getTopFoods,
} from '../controllers/foodController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getFoods).post(protect, admin, createFood)
router.route('/:id/reviews').post(protect, createFoodReview)
router.get('/top', getTopFoods)
router
  .route('/:id')
  .get(getFoodById)
  .delete(protect, admin, deleteFood)
  .put(protect, admin, updateFood)

export default router
