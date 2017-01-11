import { STORE_TEMP_NEW_POSTS } from '../actions/actionTypes'

const initial = {
  newPostsLength: 0,
  tempPosts: []
}

export default (state = initial, action = {}) => {
  switch (action.type) {

    case STORE_TEMP_NEW_POSTS:
      if(action.data) {
        return {
          ...state,
          newPostsLength: action.data.length,
          tempPosts: action.data
        }
      } else {
        return {}
      }


    default:
      return state

  }
}
