import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { listTopStalls } from '../../actions/stallActions'

const StallCarousel = () => {
  const dispatch = useDispatch()

  const stallTopRated = useSelector((state) => state.stallTopRated)
  const { loading, error, stalls } = stallTopRated

  useEffect(() => {
    dispatch(listTopStalls())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {stalls.map((stall) => (
        <Carousel.Item key={stall._id}>
          <Link to={`/stall/${stall._id}`}>
            <Image src={stall.image} alt={stall.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {stall.name} ({stall.description})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default StallCarousel
