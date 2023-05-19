import {
  BAR_LIST_REQUEST,
  BAR_LIST_SUCCESS,
  BAR_LIST_FAIL,
  BAR_DETAILS_REQUEST,
  BAR_DETAILS_SUCCESS,
  BAR_DETAILS_FAIL,
  BAR_DELETE_REQUEST,
  BAR_DELETE_SUCCESS,
  BAR_DELETE_FAIL,
  BAR_CREATE_RESET,
  BAR_CREATE_FAIL,
  BAR_CREATE_SUCCESS,
  BAR_CREATE_REQUEST,
  BAR_UPDATE_REQUEST,
  BAR_UPDATE_SUCCESS,
  BAR_UPDATE_FAIL,
  BAR_UPDATE_RESET,
  BAR_CREATE_REVIEW_REQUEST,
  BAR_CREATE_REVIEW_SUCCESS,
  BAR_CREATE_REVIEW_FAIL,
  BAR_CREATE_REVIEW_RESET,
  BAR_TOP_REQUEST,
  BAR_TOP_SUCCESS,
  BAR_TOP_FAIL,
} from '../constants/barConstants'

export const barListReducer = (state = { bars: [] }, action) => {
  switch (action.type) {
    case BAR_LIST_REQUEST:
      return { loading: true, bars: [] }
    case BAR_LIST_SUCCESS:
      return {
        loading: false,
        bars: action.payload.bars,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case BAR_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const barDetailsReducer = (
  state = { bar: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case BAR_DETAILS_REQUEST:
      return { ...state, loading: true }
    case BAR_DETAILS_SUCCESS:
      return { loading: false, bar: action.payload }
    case BAR_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const barDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BAR_DELETE_REQUEST:
      return { loading: true }
    case BAR_DELETE_SUCCESS:
      return { loading: false, success: true }
    case BAR_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const barCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BAR_CREATE_REQUEST:
      return { loading: true }
    case BAR_CREATE_SUCCESS:
      return { loading: false, success: true, bar: action.payload }
    case BAR_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case BAR_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const barUpdateReducer = (state = { bar: {} }, action) => {
  switch (action.type) {
    case BAR_UPDATE_REQUEST:
      return { loading: true }
    case BAR_UPDATE_SUCCESS:
      return { loading: false, success: true, bar: action.payload }
    case BAR_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case BAR_UPDATE_RESET:
      return { bar: {} }
    default:
      return state
  }
}

export const barReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BAR_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case BAR_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case BAR_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case BAR_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const barTopRatedReducer = (state = { bars: [] }, action) => {
  switch (action.type) {
    case BAR_TOP_REQUEST:
      return { loading: true, bars: [] }
    case BAR_TOP_SUCCESS:
      return { loading: false, bars: action.payload }
    case BAR_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
