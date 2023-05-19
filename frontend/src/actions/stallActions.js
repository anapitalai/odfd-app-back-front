import axios from 'axios'
import {
  STALL_LIST_REQUEST,
  STALL_LIST_SUCCESS,
  STALL_LIST_FAIL,
  STALL_DETAILS_REQUEST,
  STALL_DETAILS_SUCCESS,
  STALL_DETAILS_FAIL,
  STALL_DELETE_SUCCESS,
  STALL_DELETE_REQUEST,
  STALL_DELETE_FAIL,
  STALL_CREATE_REQUEST,
  STALL_CREATE_SUCCESS,
  STALL_CREATE_FAIL,
  STALL_UPDATE_REQUEST,
  STALL_UPDATE_SUCCESS,
  STALL_UPDATE_FAIL,
  STALL_CREATE_REVIEW_REQUEST,
  STALL_CREATE_REVIEW_SUCCESS,
  STALL_CREATE_REVIEW_FAIL,
  STALL_TOP_REQUEST,
  STALL_TOP_SUCCESS,
  STALL_TOP_FAIL,
} from '../constants/stallConstants'
import { logout } from './userActions'

export const listStalls = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: STALL_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/stalls?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: STALL_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STALL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listStallDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STALL_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/stalls/${id}`)

    dispatch({
      type: STALL_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STALL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteStall = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STALL_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/stalls/${id}`, config)

    dispatch({
      type: STALL_DELETE_SUCCESS,
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
      type: STALL_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createStall = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STALL_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/stalls`, {}, config)

    dispatch({
      type: STALL_CREATE_SUCCESS,
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
      type: STALL_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateStall = (stall) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STALL_UPDATE_REQUEST,
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
      `/api/stalls/${stall._id}`,
      stall,
      config
    )

    dispatch({
      type: STALL_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: STALL_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STALL_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createProductReview = (stallId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: STALL_CREATE_REVIEW_REQUEST,
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

    await axios.post(`/api/stalls/${stallId}/reviews`, review, config)

    dispatch({
      type: STALL_CREATE_REVIEW_SUCCESS,
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
      type: STALL_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopStalls = () => async (dispatch) => {
  try {
    dispatch({ type: STALL_TOP_REQUEST })

    const { data } = await axios.get(`/api/stalls/top`)

    dispatch({
      type: STALL_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STALL_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
