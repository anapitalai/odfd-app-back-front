import {
  FOOD_LIST_REQUEST,
  FOOD_LIST_SUCCESS,
  FOOD_LIST_FAIL,
  FOOD_DETAILS_REQUEST,
  FOOD_DETAILS_SUCCESS,
  FOOD_DETAILS_FAIL,
  FOOD_DELETE_REQUEST,
  FOOD_DELETE_SUCCESS,
  FOOD_DELETE_FAIL,
  FOOD_CREATE_RESET,
  FOOD_CREATE_FAIL,
  FOOD_CREATE_SUCCESS,
  FOOD_CREATE_REQUEST,
  FOOD_UPDATE_REQUEST,
  FOOD_UPDATE_SUCCESS,
  FOOD_UPDATE_FAIL,
  FOOD_UPDATE_RESET,
  FOOD_CREATE_REVIEW_REQUEST,
  FOOD_CREATE_REVIEW_SUCCESS,
  FOOD_CREATE_REVIEW_FAIL,
  FOOD_CREATE_REVIEW_RESET,
  FOOD_TOP_REQUEST,
  FOOD_TOP_SUCCESS,
  FOOD_TOP_FAIL,
} from '../constants/foodConstants'

export const foodListReducer = (state = { foods: [] }, action) => {
  switch (action.type) {
    case FOOD_LIST_REQUEST:
      return { loading: true, foods: [] }
    case FOOD_LIST_SUCCESS:
      return {
        loading: false,
        foods: action.payload.foods,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case FOOD_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const foodDetailsReducer = (
  state = { food: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case FOOD_DETAILS_REQUEST:
      return { ...state, loading: true }
    case FOOD_DETAILS_SUCCESS:
      return { loading: false, food: action.payload }
    case FOOD_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const foodDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FOOD_DELETE_REQUEST:
      return { loading: true }
    case FOOD_DELETE_SUCCESS:
      return { loading: false, success: true }
    case FOOD_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const foodCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FOOD_CREATE_REQUEST:
      return { loading: true }
    case FOOD_CREATE_SUCCESS:
      return { loading: false, success: true, food: action.payload }
    case FOOD_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case FOOD_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const foodUpdateReducer = (state = { food: {} }, action) => {
  switch (action.type) {
    case FOOD_UPDATE_REQUEST:
      return { loading: true }
    case FOOD_UPDATE_SUCCESS:
      return { loading: false, success: true, food: action.payload }
    case FOOD_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case FOOD_UPDATE_RESET:
      return { food: {} }
    default:
      return state
  }
}

export const foodReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FOOD_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case FOOD_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case FOOD_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case FOOD_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const foodTopRatedReducer = (state = { foods: [] }, action) => {
  switch (action.type) {
    case FOOD_TOP_REQUEST:
      return { loading: true, foods: [] }
    case FOOD_TOP_SUCCESS:
      return { loading: false, foods: action.payload }
    case FOOD_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
