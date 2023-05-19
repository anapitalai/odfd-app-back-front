import express from 'express'
const router = express.Router()
import {
  getStalls,
  getStallById,
  deleteStall,
  createStall,
  updateStall,
  createStallReview,
  getTopStalls,
} from '../controllers/stallController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getStalls).post(protect, admin, createStall)
router.route('/:id/reviews').post(protect, createStallReview)
router.get('/top', getTopStalls)
router
  .route('/:id')
  .get(getStallById)
  .delete(protect, admin, deleteStall)
  .put(protect, admin, updateStall)

export default router

// import express from 'express'
// const router = express.Router()
// import {
//   getProducts,
//   getProductById,
//   deleteProduct,
//   createProduct,
//   updateProduct,
//   createProductReview,
//   getTopProducts,
// } from '../controllers/productController.js'
// import { protect, admin } from '../middleware/authMiddleware.js'

// router.route('/').get(getProducts).post(protect, admin, createProduct)
// router.route('/:id/reviews').post(protect, createProductReview)
// router.get('/top', getTopProducts)
// router
//   .route('/:id')
//   .get(getProductById)
//   .delete(protect, admin, deleteProduct)
//   .put(protect, admin, updateProduct)

// export default router
