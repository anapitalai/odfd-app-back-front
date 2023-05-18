import asyncHandler from 'express-async-handler'
import Food from '../models/foodModel.js'

// @desc    Fetch all foods
// @route   GET /api/foods
// @access  Public
const getFoods = asyncHandler(async (req, res) => {
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

  const count = await Food.countDocuments({ ...keyword })
  const foods = await Food.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ foods, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single food
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id)

  if (food) {
    res.json(food)
  } else {
    res.status(404)
    throw new Error('Food not found')
  }
})

// @desc    Delete a food
// @route   DELETE /api/foods/:id
// @access  Private/Admin
const deleteFood = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id)

  if (food) {
    await food.remove()
    res.json({ message: 'Food removed' })
  } else {
    res.status(404)
    throw new Error('Food not found')
  }
})

// @desc    Create a food
// @route   POST /api/foods
// @access  Private/Admin
const createFood = asyncHandler(async (req, res) => {
  const product = new Food({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdFood = await food.save()
  res.status(201).json(createdFood)
})

// @desc    Update a food
// @route   PUT /api/foods/:id
// @access  Private/Admin
const updateFood = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const food = await Food.findById(req.params.id)

  if (food) {
    food.name = name
    food.price = price
    food.description = description
    food.image = image
    food.brand = brand
    food.category = category
    food.countInStock = countInStock

    const updatedFood = await food.save()
    res.json(updatedFood)
  } else {
    res.status(404)
    throw new Error('Food not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createFoodReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const food = await Food.findById(req.params.id)

  if (food) {
    const alreadyReviewed = food.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Food already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    food.reviews.push(review)

    food.numReviews = food.reviews.length

    food.rating =
      food.reviews.reduce((acc, item) => item.rating + acc, 0) /
      food.reviews.length

    await food.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Food not found')
  }
})

// @desc    Get top rated foods
// @route   GET /api/foods/top
// @access  Public
const getTopFoods = asyncHandler(async (req, res) => {
  const foods = await Food.find({}).sort({ rating: -1 }).limit(3)

  res.json(foods)
})

export {
  getFoods,
  getFoodById,
  deleteFood,
  createFood,
  updateFood,
  createFoodReview,
  getTopFoods,
}
