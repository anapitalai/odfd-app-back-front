import axios from 'axios'
import {
  RESTAURANT_LIST_REQUEST,
  RESTAURANT_LIST_SUCCESS,
  RESTAURANT_LIST_FAIL,
  RESTAURANT_DETAILS_REQUEST,
  RESTAURANT_DETAILS_SUCCESS,
  RESTAURANT_DETAILS_FAIL,
  RESTAURANT_DELETE_SUCCESS,
  RESTAURANT_DELETE_REQUEST,
  RESTAURANT_DELETE_FAIL,
  RESTAURANT_CREATE_REQUEST,
  RESTAURANT_CREATE_SUCCESS,
  RESTAURANT_CREATE_FAIL,
  RESTAURANT_UPDATE_REQUEST,
  RESTAURANT_UPDATE_SUCCESS,
  RESTAURANT_UPDATE_FAIL,
  RESTAURANT_CREATE_REVIEW_REQUEST,
  RESTAURANT_CREATE_REVIEW_SUCCESS,
  RESTAURANT_CREATE_REVIEW_FAIL,
  RESTAURANT_CREATE_FAVOURITE_REQUEST,
  RESTAURANT_CREATE_FAVOURITE_SUCCESS,
  RESTAURANT_CREATE_FAVOURITE_FAIL,
  RESTAURANT_TOP_REQUEST,
  RESTAURANT_TOP_SUCCESS,
  RESTAURANT_TOP_FAIL,
} from '../constants/restaurantConstants'
import { logout } from './userActions'

export const listRestaurants = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: RESTAURANT_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/restaurants?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: RESTAURANT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESTAURANT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listRestaurantDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/restaurants/${id}`)

    dispatch({
      type: RESTAURANT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESTAURANT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteRestaurant = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESTAURANT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/restaurants/${id}`, config)

    dispatch({
      type: RESTAURANT_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RESTAURANT_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createRestaurant = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESTAURANT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/restaurants`, {}, config)

    dispatch({
      type: RESTAURANT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RESTAURANT_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateRestaurant = (restaurant) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESTAURANT_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/restaurants/${restaurant._id}`,
      restaurant,
      config
    )

    dispatch({
      type: RESTAURANT_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: RESTAURANT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RESTAURANT_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createRestaurantReview = (restaurantId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: RESTAURANT_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/restaurants/${restaurantId}/reviews`, review, config)

    dispatch({
      type: RESTAURANT_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RESTAURANT_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const createRestaurantFavourite = (restaurantId, favourite) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: RESTAURANT_CREATE_FAVOURITE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`http://localhost/predict/${restaurantId}/favourites`, favourite, config)

    dispatch({
      type: RESTAURANT_CREATE_FAVOURITE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RESTAURANT_CREATE_FAVOURITE_FAIL,
      payload: message,
    })
  }
}

export const listTopRestaurants = () => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_TOP_REQUEST })

    const { data } = await axios.get(`/api/restaurants/top`)

    dispatch({
      type: RESTAURANT_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESTAURANT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
