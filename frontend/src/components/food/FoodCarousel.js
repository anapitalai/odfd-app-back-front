import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { listTopFoods } from '../../actions/foodActions'

const FoodCarousel = () => {
  const dispatch = useDispatch()

  const foodTopRated = useSelector((state) => state.foodTopRated)
  const { loading, error, foods } = foodTopRated

  useEffect(() => {
    dispatch(listTopFoods())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {foods.map((food) => (
        <Carousel.Item key={food._id}>
          <Link to={`/food/${food._id}`}>
            <Image src={food.image} alt={food.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {food.name} ({food.description})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default FoodCarousel
