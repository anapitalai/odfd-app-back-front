import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
  )

  const pointSchema = mongoose.Schema({
  type: {
    type: String,
    enum:['Point'],
    default:'Point'
  
  },
  coordinates: {
    type: [Number],
    required : true,
    index: '2dsphere'
  },
});

  const restaurantSchema = mongoose.Schema(
    {
      users_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
      description:{
        type: String,
        required: false
      },
      // location:pointSchema,
      location: {
        type: {
          type: String,
          enum: ['Point'],
          default:'Point'
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
      },
      food_menu: {
        type: String,
        required: false,
      },
      drinks_menu: {
        type: String,
        required: false,
      },
      reviews: [reviewSchema],
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
      numReviews: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  )

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant
