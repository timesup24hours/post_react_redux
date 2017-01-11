import { SET_COMMENT, ADD_COMMENT, DELETE_COMMENT} from '../actions/actionTypes'

const initial = []

export default (state = initial, action = {}) => {
  switch (action.type) {
    case SET_COMMENT:
      return action.data

    case ADD_COMMENT:
      return [
        ...state,
        {
          _id: action.data._id,
          content: action.data.content,
          create_at: action.data.create_at,
          postedBy: {
            _id: action.data.postedBy._id,
            local: {
              nick_name: action.data.postedBy.local.nick_name,
              username: action.data.postedBy.local.username,
              avatar_name: action.data.postedBy.local.avatar_name,
            }
          }
        }
      ]

    case DELETE_COMMENT:
      return state.filter( c => c._id !== action.id)


    default:
      return state;

  }
}
