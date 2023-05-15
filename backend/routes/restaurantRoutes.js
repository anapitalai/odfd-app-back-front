import express from 'express'
const router = express.Router()
import {
  getRestaurants,
  getProductById,
  deleteProduct,
  createRestaurant,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/restaurantController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getRestaurants).post(protect, admin, createRestaurant)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
