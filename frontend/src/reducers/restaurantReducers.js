import {
  RESTAURANT_LIST_REQUEST,
  RESTAURANT_LIST_SUCCESS,
  RESTAURANT_LIST_FAIL,
  RESTAURANT_DETAILS_REQUEST,
  RESTAURANT_DETAILS_SUCCESS,
  RESTAURANT_DETAILS_FAIL,
  RESTAURANT_DELETE_REQUEST,
  RESTAURANT_DELETE_SUCCESS,
  RESTAURANT_DELETE_FAIL,
  RESTAURANT_CREATE_RESET,
  RESTAURANT_CREATE_FAIL,
  RESTAURANT_CREATE_SUCCESS,
  RESTAURANT_CREATE_REQUEST,
  RESTAURANT_UPDATE_REQUEST,
  RESTAURANT_UPDATE_SUCCESS,
  RESTAURANT_UPDATE_FAIL,
  RESTAURANT_UPDATE_RESET,
  RESTAURANT_CREATE_REVIEW_REQUEST,
  RESTAURANT_CREATE_REVIEW_SUCCESS,
  RESTAURANT_CREATE_REVIEW_FAIL,
  RESTAURANT_CREATE_REVIEW_RESET,
  // ML Logic
  RESTAURANT_CREATE_FAVOURITE_REQUEST,
  RESTAURANT_CREATE_FAVOURITE_SUCCESS,
  RESTAURANT_CREATE_FAVOURITE_FAIL,
  RESTAURANT_CREATE_FAVOURITE_RESET,

  RESTAURANT_TOP_REQUEST,
  RESTAURANT_TOP_SUCCESS,
  RESTAURANT_TOP_FAIL,
} from '../constants/restaurantConstants'

export const restaurantListReducer = (state = { restaurants: [] }, action) => {
  switch (action.type) {
    case RESTAURANT_LIST_REQUEST:
      return { loading: true, restaurants: [] }
    case RESTAURANT_LIST_SUCCESS:
      return {
        loading: false,
        restaurants: action.payload.restaurants,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case RESTAURANT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const restaurantDetailsReducer = (
  state = { restaurant: { reviews: [],location:{coordinates:[]} } },
  action
) => {
  switch (action.type) {
    case RESTAURANT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case RESTAURANT_DETAILS_SUCCESS:
      return { loading: false, restaurant: action.payload }
    case RESTAURANT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const restaurantDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_DELETE_REQUEST:
      return { loading: true }
    case RESTAURANT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case RESTAURANT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const restaurantCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_CREATE_REQUEST:
      return { loading: true }
    case RESTAURANT_CREATE_SUCCESS:
      return { loading: false, success: true, restaurant: action.payload }
    case RESTAURANT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case RESTAURANT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const restaurantUpdateReducer = (state = { restaurant: {} }, action) => {
  switch (action.type) {
    case RESTAURANT_UPDATE_REQUEST:
      return { loading: true }
    case RESTAURANT_UPDATE_SUCCESS:
      return { loading: false, success: true, restaurant: action.payload }
    case RESTAURANT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case RESTAURANT_UPDATE_RESET:
      return { restaurant: {} }
    default:
      return state
  }
}

export const restaurantReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case RESTAURANT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case RESTAURANT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case RESTAURANT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const restaurantFavouriteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_CREATE_FAVOURITE_REQUEST:
      return { loading: true }
    case RESTAURANT_CREATE_FAVOURITE_SUCCESS:
      return { loading: false, success: true }
    case RESTAURANT_CREATE_FAVOURITE_FAIL:
      return { loading: false, error: action.payload }
    case RESTAURANT_CREATE_FAVOURITE_RESET:
      return {}
    default:
      return state
  }
}

export const restaurantTopRatedReducer = (state = { restaurants: [] }, action) => {
  switch (action.type) {
    case RESTAURANT_TOP_REQUEST:
      return { loading: true, restaurants: [] }
    case RESTAURANT_TOP_SUCCESS:
      return { loading: false, restaurants: action.payload }
    case RESTAURANT_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
