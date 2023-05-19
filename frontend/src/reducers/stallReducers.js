import {
  STALL_LIST_REQUEST,
  STALL_LIST_SUCCESS,
  STALL_LIST_FAIL,
  STALL_DETAILS_REQUEST,
  STALL_DETAILS_SUCCESS,
  STALL_DETAILS_FAIL,
  STALL_DELETE_REQUEST,
  STALL_DELETE_SUCCESS,
  STALL_DELETE_FAIL,
  STALL_CREATE_RESET,
  STALL_CREATE_FAIL,
  STALL_CREATE_SUCCESS,
  STALL_CREATE_REQUEST,
  STALL_UPDATE_REQUEST,
  STALL_UPDATE_SUCCESS,
  STALL_UPDATE_FAIL,
  STALL_UPDATE_RESET,
  STALL_CREATE_REVIEW_REQUEST,
  STALL_CREATE_REVIEW_SUCCESS,
  STALL_CREATE_REVIEW_FAIL,
  STALL_CREATE_REVIEW_RESET,
  STALL_TOP_REQUEST,
  STALL_TOP_SUCCESS,
  STALL_TOP_FAIL,
} from '../constants/stallConstants'

export const stallListReducer = (state = { stalls: [] }, action) => {
  switch (action.type) {
    case STALL_LIST_REQUEST:
      return { loading: true, stalls: [] }
    case STALL_LIST_SUCCESS:
      return {
        loading: false,
        stalls: action.payload.stalls,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case STALL_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const stallDetailsReducer = (
  state = { stall: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case STALL_DETAILS_REQUEST:
      return { ...state, loading: true }
    case STALL_DETAILS_SUCCESS:
      return { loading: false, stall: action.payload }
    case STALL_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const stallDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STALL_DELETE_REQUEST:
      return { loading: true }
    case STALL_DELETE_SUCCESS:
      return { loading: false, success: true }
    case STALL_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const stallCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STALL_CREATE_REQUEST:
      return { loading: true }
    case STALL_CREATE_SUCCESS:
      return { loading: false, success: true, stall: action.payload }
    case STALL_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case STALL_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const stallUpdateReducer = (state = { stall: {} }, action) => {
  switch (action.type) {
    case STALL_UPDATE_REQUEST:
      return { loading: true }
    case STALL_UPDATE_SUCCESS:
      return { loading: false, success: true, stall: action.payload }
    case STALL_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case STALL_UPDATE_RESET:
      return { stall: {} }
    default:
      return state
  }
}

export const stallReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STALL_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case STALL_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case STALL_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case STALL_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const stallTopRatedReducer = (state = { stalls: [] }, action) => {
  switch (action.type) {
    case STALL_TOP_REQUEST:
      return { loading: true, stalls: [] }
    case STALL_TOP_SUCCESS:
      return { loading: false, stalls: action.payload }
    case STALL_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
