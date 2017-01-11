import { POST_FORM_SHOW, POST_FORM_SUBMITTING,
  POST_FORM_SUBMIT_SUCCESS, POST_FORM_SUBMIT_FAILURE,
  POST_FORM_SUBMIT_DONE } from '../actions/actionTypes'

const initial = {
  show: false,
  submitting: false,
  success: false,
  failure: false,
  errMsg: ''
}

export default (state = initial, action = {}) => {
  switch (action.type) {
    case POST_FORM_SHOW:
      return {
        ...state,
        show: !state.show
      }

    case POST_FORM_SUBMITTING:
      return {
        ...state,
        submitting: true,
        errMsg: '',
        failure: false,
      }

    case POST_FORM_SUBMIT_SUCCESS:
      return {
        ...state,
        success: true,
        submitting: true,
        failure: false,
        errMsg: '',
      }

    case POST_FORM_SUBMIT_FAILURE:
      return {
        ...state,
        failure: true,
        errMsg: action.errMsg,
        success: false,
        submitting: false
      }

    case POST_FORM_SUBMIT_DONE:
      return {
        ...state,
        failure: false,
        success: false,
        submitting: false
      }


    default:
      return state
  }
}
