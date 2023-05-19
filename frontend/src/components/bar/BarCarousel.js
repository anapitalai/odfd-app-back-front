import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { listTopBars } from '../../actions/barActions'

const BarCarousel = () => {
  const dispatch = useDispatch()

  const barTopRated = useSelector((state) => state.barTopRated)
  const { loading, error, bars } = barTopRated

  useEffect(() => {
    dispatch(listTopBars())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {bars.map((bar) => (
        <Carousel.Item key={bar._id}>
          <Link to={`/bar/${bar._id}`}>
            <Image src={bar.image} alt={bar.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {bar.name} ({bar.description})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default BarCarousel
