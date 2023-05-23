import express from 'express'
const router = express.Router()
import {
  getBars,
  getBarById,
  createBar,
  deleteBar,
  updateBar,
  createBarReview,
  getTopBars,
} from '../controllers/barController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getBars).post(protect, admin, createBar)
router.route('/:id/reviews').post(protect, createBarReview)
router.get('/top', getTopBars)
router
  .route('/:id')
  .get(getBarById)
  .delete(protect, admin, deleteBar)
  .put(protect, admin, updateBar)

export default router
