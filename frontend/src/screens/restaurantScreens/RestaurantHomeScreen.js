import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Restaurant from '../../components/restaurant/Restaurant'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import RestaurantCarousel from '../../components/restaurant/restaurantCarousel'
import Meta from '../../components/Meta'
import { listRestaurants } from '../../actions/restaurantActions'

const RestaurantScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const restaurantList = useSelector((state) => state.restaurantList)
  const { loading, error, restaurants, page, pages } = restaurantList

  useEffect(() => {
    dispatch(listRestaurants(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {/* {!keyword ? (
        <RestaurantCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )} */}
      <h1>Food Restaurants</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {restaurants.map((restaurant) => (
              <Col key={restaurant._id} sm={12} md={6} lg={4} xl={3}>
                <Restaurant restaurant={restaurant} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default RestaurantScreen
