import asyncHandler from 'express-async-handler'
import Restaurant from '../models/restaurantModel.js'

// @desc    Fetch all restaurant
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = asyncHandler(async (req, res) => {
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

  const count = await Restaurant.countDocuments({ ...keyword })
  const restaurants = await Restaurant.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ restaurants, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single restaurant
// @route   GET /api/products/:id
// @access  Public
const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id)

  if (restaurant) {
    res.json(restaurant)
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

// @desc    Delete a restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private/Admin
const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id)

  if (restaurant) {
    await restaurant.remove()
    res.json({ message: 'Restaurant removed' })
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

// @desc    Create a restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
const createRestaurant = asyncHandler(async (req, res) => {
  const restaurant = new Restaurant({
    name: 'Sample name',
    food_menu: 'Some food menu' ,
    user: req.user._id,
    image: '/images/sample.jpg',
    drinks_menu: 'Some drink menu',
    category: 'Sample category',
    rating: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdRestaurant = await restaurant.save()
  res.status(201).json(createdRestaurant)
})

// @desc    Update a restaurant
// @route   PUT /api/restaurants/:id
// @access  Private/Admin
const updateRestaurant = asyncHandler(async (req, res) => {
  const {
    name,
    food_menu,
    drinks_menu,
    location,
    description,
    image,
  } = req.body

  const restaurant = await Restaurant.findById(req.params.id)

  if (restaurant) {
    restaurant.name = name
    restaurant.location = location
    restaurant.description = description
    restaurant.image = image
    restaurant.food_menu = food_menu
    restaurant.drinks_menu = drinks_menu
 

    const updatedRestaurant = await restaurant.save()
    res.json(updatedRestaurant)
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createRestaurantReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const restaurant = await Restaurant.findById(req.params.id)

  if (restaurant) {
    const alreadyReviewed = restaurant.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Restaurant already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    restaurant.reviews.push(review)

    restaurant.numReviews = restaurant.reviews.length

    restaurant.rating =
      restaurant.reviews.reduce((acc, item) => item.rating + acc, 0) /
      restaurant.reviews.length

    await restaurant.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

// @desc    Get top rated restaurants
// @route   GET /api/restaurants/top
// @access  Public
const getTopRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({}).sort({ rating: -1 }).limit(3)

  res.json(restaurants)
})

export {
  getRestaurants,
  getRestaurantById,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
  createRestaurantReview,
  getTopRestaurants,
}
