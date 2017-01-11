import { SET_CURRENT_USER, CHANGE_INFO_FIELD } from '../actions/actionTypes';
import { isEmpty } from 'lodash';

const initial = {
  isAuthenticated: false,
  user: {}
}

export default ( state = initial, action = {} ) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }

    case CHANGE_INFO_FIELD:
      return {
        ...state,
        user: {
          ...state.user,
          [action.data.fieldName]: action.data.value
        }
      }


    default:
      return state;
  }
}
