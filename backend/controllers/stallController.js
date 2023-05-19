import asyncHandler from 'express-async-handler'
// import Product from '../models/productModel.js'
import Stall from '../models/stallModel.js'

// @desc    Fetch all stalls
// @route   GET /api/stalls
// @access  Public
const getStalls = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Stall.countDocuments({ ...keyword })
  const stalls = await Stall.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ stalls, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single stall
// @route   GET /api/stalls/:id
// @access  Public
const getStallById = asyncHandler(async (req, res) => {
  const stall = await Stall.findById(req.params.id)

  if (stall) {
    res.json(stall)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a stall
// @route   DELETE /api/stalls/:id
// @access  Private/Admin
const deleteStall = asyncHandler(async (req, res) => {
  const stall = await Stall.findById(req.params.id)

  if (stall) {
    await stall.remove()
    res.json({ message: 'Stall removed' })
  } else {
    res.status(404)
    throw new Error('Stall not found')
  }
})

// @desc    Create a stall
// @route   POST /api/stalls
// @access  Private/Admin
const createStall = asyncHandler(async (req, res) => {
  const stall = new Stall({
    name: 'Sample name',
    user: req.user._id,
    image: '/images/sample.jpg',
    drinks_menu:'Some Menu',
    food_menu:'Some menu',
    location:'Some cordinates',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdStall = await stall.save()
  res.status(201).json(createdStall)
})

// @desc    Update a stall
// @route   PUT /api/stalls/:id
// @access  Private/Admin
const updateStall = asyncHandler(async (req, res) => {
  const {
    name,
    location,
    drinks_menu,
    food_menu,
    description,
    image,
    category,
    countInStock,
  } = req.body

  const stall = await Stall.findById(req.params.id)

  if (stall) {
    stall.name = name
    stall.location = location
    stall.description = description
    stall.image = image
    stall.food_menu = food_menu
    stall.drinks_menu = drinks_menu
    stall.countInStock = countInStock

    const updatedStall = await stall.save()
    res.json(updatedStall)
  } else {
    res.status(404)
    throw new Error('Stall not found')
  }
})

// @desc    Create new review
// @route   POST /api/stalls/:id/reviews
// @access  Private
const createStallReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const stall = await Stall.findById(req.params.id)

  if (stall) {
    const alreadyReviewed = stall.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Stall already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    stall.reviews.push(review)

    stall.numReviews = stall.reviews.length

    stall.rating =
      stall.reviews.reduce((acc, item) => item.rating + acc, 0) /
      stall.reviews.length

    await stall.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Stall not found')
  }
})

// @desc    Get top rated stalls
// @route   GET /api/stalls/top
// @access  Public
const getTopStalls = asyncHandler(async (req, res) => {
  const stalls = await Stall.find({}).sort({ rating: -1 }).limit(3)

  res.json(stalls)
})

export {
  getStalls,
  getStallById,
  deleteStall,
  createStall,
  updateStall,
  createStallReview,
  getTopStalls,
}

// // @desc    Fetch all products
// // @route   GET /api/products
// // @access  Public
// const getProducts = asyncHandler(async (req, res) => {
//   const pageSize = 10
//   const page = Number(req.query.pageNumber) || 1

//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: 'i',
//         },
//       }
//     : {}

//   const count = await Product.countDocuments({ ...keyword })
//   const products = await Product.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1))

//   res.json({ products, page, pages: Math.ceil(count / pageSize) })
// })

// // @desc    Fetch single product
// // @route   GET /api/products/:id
// // @access  Public
// const getProductById = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id)

//   if (product) {
//     res.json(product)
//   } else {
//     res.status(404)
//     throw new Error('Product not found')
//   }
// })

// // @desc    Delete a product
// // @route   DELETE /api/products/:id
// // @access  Private/Admin
// const deleteProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id)

//   if (product) {
//     await product.remove()
//     res.json({ message: 'Product removed' })
//   } else {
//     res.status(404)
//     throw new Error('Product not found')
//   }
// })

// // @desc    Create a product
// // @route   POST /api/products
// // @access  Private/Admin
// const createProduct = asyncHandler(async (req, res) => {
//   const product = new Product({
//     name: 'Sample name',
//     price: 0,
//     user: req.user._id,
//     image: '/images/sample.jpg',
//     brand: 'Sample brand',
//     category: 'Sample category',
//     countInStock: 0,
//     numReviews: 0,
//     description: 'Sample description',
//   })

//   const createdProduct = await product.save()
//   res.status(201).json(createdProduct)
// })

// // @desc    Update a product
// // @route   PUT /api/products/:id
// // @access  Private/Admin
// const updateProduct = asyncHandler(async (req, res) => {
//   const {
//     name,
//     price,
//     description,
//     image,
//     brand,
//     category,
//     countInStock,
//   } = req.body

//   const product = await Product.findById(req.params.id)

//   if (product) {
//     product.name = name
//     product.price = price
//     product.description = description
//     product.image = image
//     product.brand = brand
//     product.category = category
//     product.countInStock = countInStock

//     const updatedProduct = await product.save()
//     res.json(updatedProduct)
//   } else {
//     res.status(404)
//     throw new Error('Product not found')
//   }
// })

// // @desc    Create new review
// // @route   POST /api/products/:id/reviews
// // @access  Private
// const createProductReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body

//   const product = await Product.findById(req.params.id)

//   if (product) {
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     )

//     if (alreadyReviewed) {
//       res.status(400)
//       throw new Error('Product already reviewed')
//     }

//     const review = {
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//       user: req.user._id,
//     }

//     product.reviews.push(review)

//     product.numReviews = product.reviews.length

//     product.rating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length

//     await product.save()
//     res.status(201).json({ message: 'Review added' })
//   } else {
//     res.status(404)
//     throw new Error('Product not found')
//   }
// })

// // @desc    Get top rated products
// // @route   GET /api/products/top
// // @access  Public
// const getTopProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({}).sort({ rating: -1 }).limit(3)

//   res.json(products)
// })

// export {
//   getProducts,
//   getProductById,
//   deleteProduct,
//   createProduct,
//   updateProduct,
//   createProductReview,
//   getTopProducts,
// }
