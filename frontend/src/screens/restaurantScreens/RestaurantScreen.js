import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form,Container } from 'react-bootstrap'
import Rating from '../../components/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import MapComponent from '../../components/MapComponent'
import {
  listRestaurantDetails,
  createRestaurantReview,
  createRestaurantFavourite
} from '../../actions/restaurantActions'
import { RESTAURANT_CREATE_REVIEW_RESET } from '../../constants/restaurantConstants'

const RestaurantScreen = ({ history, match}) => {
  const [users_id, setUsers_Id] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const restaurantDetails = useSelector((state) => state.restaurantDetails)
  const { loading, error, restaurant } = restaurantDetails


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const restaurantReviewCreate = useSelector((state) => state.restaurantReviewCreate)
  const {
    success: successRestaurantReview,
    loading: loadingRestaurantReview,
    error: errorRestaurantReview,
  } = restaurantReviewCreate

  const restaurantFavouriteCreate = useSelector((state) => state.restaurantFavouriteCreate)
  const {
    success: successRestaurantFavourite,
    loading: loadingRestaurantFavourite,
    error: errorRestaurantFavourite,
  } = restaurantFavouriteCreate
  //logger
  useEffect(()=>console.log(restaurantDetails),[restaurantDetails])
  // useEffect(()=>console.log('test corner',[restaurant.location][0].coordinates[0]),[restaurant])

  useEffect(() => {
    if (successRestaurantReview) {
      setRating(0)
      setComment('')
    }
    if (!restaurant._id || restaurant._id !== match.params.id) {
      dispatch(listRestaurantDetails(match.params.id))
  
      dispatch({ type: RESTAURANT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successRestaurantReview])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createRestaurantReview(match.params.id, {
        rating,
        comment,
      })
    )
  }
  const submitFavouriteHandler = (e) => {
    e.preventDefault()
    dispatch(
      createRestaurantFavourite(match.params.id, {
        users_id
      })
    )
  }


  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={restaurant.name} />
              
      <Row>
        <Col md={6}>
        <Image src={restaurant.image} alt={restaurant.name} fluid />
        <ListGroup>
          <span>User: {restaurant.users_id}</span>
        </ListGroup>
       
        {userInfo ? (
                    <Form onSubmit={submitFavouriteHandler}>
                      <Form.Group controlId='users_id'>
                        <Form.Label>users_id</Form.Label>
                        <Form.Control
                          as='select'
                          value={users_id}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>{restaurant.users_id}</option>
                        </Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingRestaurantFavourite}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
        
        </Col>
     
        <Col md={6}>
        <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{restaurant.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={restaurant.rating}
                    text={`${restaurant.numReviews} reviews`}
                  />
                </ListGroup.Item>
                     
                      <ListGroup.Item>Map Location:{restaurant.location.coordinates}
                      </ListGroup.Item>  

                <ListGroup.Item>
                  Description: {restaurant.description}
                </ListGroup.Item>
              </ListGroup>
        </Col>
       
      </Row>
      <Row>
      <Col md={4}>
      <h2>Reviews</h2>
              {restaurant.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {restaurant.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successRestaurantReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingRestaurantReview && <Loader />}
                  {errorRestaurantReview && (
                    <Message variant='danger'>{errorRestaurantReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingRestaurantReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>

      </Col>
        <Col md={8}>
          <MapComponent longitude={restaurant.location.coordinates[0]} latitude={restaurant.location.coordinates[1]} />
          
        </Col>
      </Row>

        </>
      )}
    </>
  )
}

export default RestaurantScreen
