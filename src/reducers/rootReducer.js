import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import navReducer from './navReducer'
import routeStatusReducer from './routeStatusReducer'
import activeClassReducer from './activeClassReducer'
import postReducer from './postReducer'
import postFormReducer from './postFormReducer'
import commentReducer from './commentReducer'
import paginatedPosts from './paginatedPosts'
import notificationReducer from './notificationReducer'
import authReducer from './authReducer'
import userReducer from './userReducer'
import chatReducer from './chatReducer'
import appReducer from './appReducer'
import tempNewPostsReducer from './tempNewPostsReducer'
import userDetailReducer from './userDetailReducer'

export default combineReducers({
  form: formReducer,
  nav: navReducer,
  routeStatus: routeStatusReducer,
  activeClass: activeClassReducer,
  posts: postReducer,
  postForm: postFormReducer,
  comments: commentReducer,
  paginatedPosts: paginatedPosts, // test
  notification: notificationReducer,
  auth: authReducer,
  user: userReducer,
  chat: chatReducer,
  appStatus: appReducer,
  tempNewPosts: tempNewPostsReducer,
  userDetail: userDetailReducer
});
