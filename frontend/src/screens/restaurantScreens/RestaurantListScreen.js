import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import {
  listRestaurants,
  deleteRestaurant,
  createRestaurant,
} from '../../actions/restaurantActions'
import { RESTAURANT_CREATE_RESET } from '../../constants/restaurantConstants'

const RestaurantListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const restaurantList = useSelector((state) => state.restaurantList)
  const { loading, error, restaurants, page, pages } = restaurantList

  const restaurantDelete = useSelector((state) => state.restaurantDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = restaurantDelete

  const restaurantCreate = useSelector((state) => state.restaurantCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    restaurant: createdRestaurant,
  } = restaurantCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: RESTAURANT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/restaurantlist/${createdRestaurant._id}/edit`)
    } else {
      dispatch(listRestaurants('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdRestaurant,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteRestaurant(id))
    }
  }

  const createRestaurantHandler = () => {
    dispatch(createRestaurant())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Restaurants</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createRestaurantHandler}>
            <i className='fas fa-plus'></i> Create Restaurant
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DRINKS MENU</th>
                <th>FOOD MENU</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant._id}>
                  <td>{restaurant._id}</td>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.drinks_menu}</td>
                  <td>{restaurant.food_menu}</td>
                  <td>
                    <LinkContainer to={`/admin/restaurantlist/${restaurant._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(restaurant._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default RestaurantListScreen
