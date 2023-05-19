import axios from 'axios'
import {
  BAR_LIST_REQUEST,
  BAR_LIST_SUCCESS,
  BAR_LIST_FAIL,
  BAR_DETAILS_REQUEST,
  BAR_DETAILS_SUCCESS,
  BAR_DETAILS_FAIL,
  BAR_DELETE_SUCCESS,
  BAR_DELETE_REQUEST,
  BAR_DELETE_FAIL,
  BAR_CREATE_REQUEST,
  BAR_CREATE_SUCCESS,
  BAR_CREATE_FAIL,
  BAR_UPDATE_REQUEST,
  BAR_UPDATE_SUCCESS,
  BAR_UPDATE_FAIL,
  BAR_CREATE_REVIEW_REQUEST,
  BAR_CREATE_REVIEW_SUCCESS,
  BAR_CREATE_REVIEW_FAIL,
  BAR_TOP_REQUEST,
  BAR_TOP_SUCCESS,
  BAR_TOP_FAIL,
} from '../constants/barConstants'
import { logout } from './userActions'

export const listBars = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: BAR_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/bars?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: BAR_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BAR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBarDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BAR_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/bars/${id}`)

    dispatch({
      type: BAR_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BAR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteBar = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BAR_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/bars/${id}`, config)

    dispatch({
      type: BAR_DELETE_SUCCESS,
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
      type: BAR_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createBar = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BAR_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/bars`, {}, config)

    dispatch({
      type: BAR_CREATE_SUCCESS,
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
      type: BAR_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateBar = (bar) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BAR_UPDATE_REQUEST,
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
      `/api/bars/${bar._id}`,
      bar,
      config
    )

    dispatch({
      type: BAR_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: BAR_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BAR_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createBarReview = (barId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BAR_CREATE_REVIEW_REQUEST,
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

    await axios.post(`/api/bars/${barId}/reviews`, review, config)

    dispatch({
      type: BAR_CREATE_REVIEW_SUCCESS,
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
      type: BAR_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopBars = () => async (dispatch) => {
  try {
    dispatch({ type: BAR_TOP_REQUEST })

    const { data } = await axios.get(`/api/bars/top`)

    dispatch({
      type: BAR_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BAR_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
