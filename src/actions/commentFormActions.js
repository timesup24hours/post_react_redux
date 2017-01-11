import { SET_COMMENT, ADD_COMMENT, DELETE_COMMENT } from './actionTypes'
import axios from 'axios'
import { dataLoading, dataLoaded } from './appActions'

export function submitComment(comment) {
  return dispatch => {
    return axios.post('/api/comment', comment)
  }
}

export function deleteComment(id) {
  return dispatch => {
    return axios.delete('/api/comment/delete_comment/' + id)
  }
}

export function loadComment(postId) {
  return dispatch => {
    dispatch(dataLoading())
    return axios.get('/api/comment?id=' + postId).then( res => {
        if(res.data) {
          dispatch(setComment(res.data))
          dispatch(dataLoaded())
        }
      })
  }
}

export function setComment(data) {
  return {
    type: SET_COMMENT,
    data
  }
}

export function addComment(data) {
  return {
    type: ADD_COMMENT,
    data
  }
}

export function deleteCommentFromReducer(id) {
  return {
    type: DELETE_COMMENT,
    id
  }
}
