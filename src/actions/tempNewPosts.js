import { STORE_TEMP_NEW_POSTS } from './actionTypes'

export function storeTempNewPosts(data) {
  return {
    type: STORE_TEMP_NEW_POSTS,
    data
  }
}
