import asyncHandler from 'express-async-handler'
import Bar from '../models/barModel.js'

// @desc    Fetch all bars
// @route   GET /api/bars
// @access  Public
const getBars = asyncHandler(async (req, res) => {
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

  const count = await Bar.countDocuments({ ...keyword })
  const products = await Bar.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single bar
// @route   GET /api/bars/:id
// @access  Public
const getBarById = asyncHandler(async (req, res) => {
  const bar = await Bar.findById(req.params.id)

  if (bar) {
    res.json(bar)
  } else {
    res.status(404)
    throw new Error('Bar not found')
  }
})

// @desc    Delete a bar
// @route   DELETE /api/bars/:id
// @access  Private/Admin
const deleteBar = asyncHandler(async (req, res) => {
  const bar = await Bar.findById(req.params.id)

  if (bar) {
    await bar.remove()
    res.json({ message: 'Bar removed' })
  } else {
    res.status(404)
    throw new Error('Bar not found')
  }
})

// @desc    Create a bar
// @route   POST /api/bars
// @access  Private/Admin
const createBar = asyncHandler(async (req, res) => {
  const bar = new Bar({
    name: 'Sample name',
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdBar = await bar.save()
  res.status(201).json(createdBar)
})

// @desc    Update a bar
// @route   PUT /api/bars/:id
// @access  Private/Admin
const updateBar = asyncHandler(async (req, res) => {
  const {
    name,
    location,
    description,
    image,
    countInStock,
  } = req.body

  const bar = await Bar.findById(req.params.id)

  if (bar) {
    bar.name = name
    bar.price = price
    bar.description = description
    bar.image = image
    bar.location = location

    const updatedBar = await bar.save()
    res.json(updatedBar)
  } else {
    res.status(404)
    throw new Error('Bar not found')
  }
})

// @desc    Create new review
// @route   POST /api/bars/:id/reviews
// @access  Private
const createBarReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const bar = await Bar.findById(req.params.id)

  if (bar) {
    const alreadyReviewed = bar.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Bar already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    bar.reviews.push(review)

    bar.numReviews = bar.reviews.length

    bar.rating =
      bar.reviews.reduce((acc, item) => item.rating + acc, 0) /
      bar.reviews.length

    await bar.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Bar not found')
  }
})

// @desc    Get top rated bars
// @route   GET /api/bars/top
// @access  Public
const getTopBars = asyncHandler(async (req, res) => {
  const bars = await Bar.find({}).sort({ rating: -1 }).limit(3)

  res.json(bars)
})

export {
  getBars,
  getBarById,
  deleteBar,
  createBar,
  updateBar,
  createBarReview,
  getTopBars,
}
