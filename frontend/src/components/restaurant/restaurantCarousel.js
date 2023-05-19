import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { listTopRestaurants } from '../../actions/restaurantActions'

const RestaurantCarousel = () => {
  const dispatch = useDispatch()

  const restaurantTopRated = useSelector((state) => state.restaurantTopRated)
  const { loading, error, restaurants } = restaurantTopRated

  useEffect(() => {
    dispatch(listTopRestaurants())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {restaurants.map((restaurant) => (
        <Carousel.Item key={restaurant._id}>
          <Link to={`/restaurant/${restaurant._id}`}>
            <Image src={restaurant.image} alt={restaurant.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {restaurant.name} ({restaurant.description})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default RestaurantCarousel
