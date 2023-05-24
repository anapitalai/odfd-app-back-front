import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { listRestaurantDetails, updateRestaurant } from '../../actions/restaurantActions'
import { RESTAURANT_UPDATE_RESET } from '../../constants/restaurantConstants'

const RestaurantEditScreen = ({ match, history }) => {
  const restaurantId = match.params.id

  const [name, setName] = useState('')
  const [location, setLocation] = useState(0)
  const [image, setImage] = useState('')
  const [service, setService] = useState('')
  const [feature, setFeature] = useState('')
  const [food_menu, setFood_menu] = useState('')
  const [drinks_menu, setDrinks_menu] = useState(0)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const restaurantDetails = useSelector((state) => state.restaurantDetails)
  const { loading, error, restaurant } = restaurantDetails

  const restaurantUpdate = useSelector((state) => state.restaurantUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = restaurantUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: RESTAURANT_UPDATE_RESET })
      history.push('/admin/restaurantlist')
    } else {
      if (!restaurant.name || restaurant._id !== restaurantId) {
        dispatch(listRestaurantDetails(restaurantId))
      } else {
        setName(restaurant.name)
        setLocation(restaurant.location)
        setService(restaurant.service)
        setImage(restaurant.image)
        setDrinks_menu(restaurant.drinks_menu)
        setFood_menu(restaurant.food_menu)
        setFeature(restaurant.feature)
  
      }
    }
  }, [dispatch, history, restaurantId, restaurant, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateRestaurant({
        _id: restaurantId,
        name,
        location,
        image,
        feature,
        service,
        food_menu,
        drinks_menu,
      })
    )
  }

  return (
    <>
      <Link to='/admin/restaurantlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Restaurant</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='drinks_menu'>
              <Form.Label>Drinks Menu</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Drinks Menu'
                value={drinks_menu}
                onChange={(e) => setDrinks_menu(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='food_menu'>
              <Form.Label>Food Menu</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter FOod'
                value={food_menu}
                onChange={(e) => setFood_menu(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='feature'>
              <Form.Label>Feature</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter feature'
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='service'>
              <Form.Label>Services</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Services'
                value={service}
                onChange={(e) => setService(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default RestaurantEditScreen
