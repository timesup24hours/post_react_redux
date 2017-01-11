import paginated from './paginatedRedux/paginated-redux'
import postReducer from './postReducer'

import {
  GOTO_POSTS_PAGE,
  NEXT_POSTS_PAGE,
  PREV_POSTS_PAGE,
  SORT_POSTS,
  FILTER_POSTS,
} from '../actions/actionTypes';


// Extend the users reducer with paginated actions, and pass the user-specific
// pagination actions to the paginated transducer (this way, if you have
// multiple paginated-extended reducers, you can keep each paginated array's
// action separated).
const paginatedPosts = paginated(postReducer, {
  GOTO_PAGE: GOTO_POSTS_PAGE,
  NEXT_PAGE: NEXT_POSTS_PAGE,
  PREV_PAGE: PREV_POSTS_PAGE,
  SORT: SORT_POSTS,
  FILTER: FILTER_POSTS
}, {
  defaultPage: 1,
  defaultSortOrder: 'desc',
  defaultSortBy: 'created_at',
  defaultPer: 8,
  defaultFilter: '',
  defaultTotal: 0
});

export default paginatedPosts;
