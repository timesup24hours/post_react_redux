import { POST_FORM_SHOW, POST_FORM_SUBMITTING,
  POST_FORM_SUBMIT_SUCCESS, POST_FORM_SUBMIT_FAILURE,
  POST_FORM_SUBMIT_DONE, ADD_POST, SET_POST } from './actionTypes'
import axios from 'axios'

import { dataLoading, dataLoaded } from './appActions'

export function loadPost() {
  return dispatch => {
    dispatch(dataLoading())
    return axios.get('/api/post').then( res => {
      if(res.data) {
        dispatch(dataLoaded())
        dispatch(setPost(res.data))
      }
    })
  }
}

export function loadMoreOldPost(oldestDate) {
  return dispatch => {
    return axios.get('/api/post/load_more_old_post/' + oldestDate)
  }
}

export function loadNewPost(latestDate) {
  return dispatch => {
    return axios.get('/api/post/load_more_new_post/' + latestDate)
  }
}

export function deletePost(id) {
  return dispatch => {
    return axios.delete(`/api/post/delete_post/${id}`)
  }
}


export function setPost(data) {
  return {
    type: SET_POST,
    data
  }
}

export function addPost(data) {
  return {
    type: ADD_POST,
    data
  }
}

export function showPostForm() {
  return {
    type: POST_FORM_SHOW
  }
}

export function sumbitPost(data) {
  return dispatch => {
    return axios.post('/api/post', data)
  }
}

export function postFormSubmitting() {
  return {
    type: POST_FORM_SUBMITTING
  }
}

export function postFormSubmitSuccess() {
  return {
    type: POST_FORM_SUBMIT_SUCCESS
  }
}

export function postFormSubmitFailure(errMsg) {
  return {
    type: POST_FORM_SUBMIT_FAILURE,
    errMsg
  }
}

export function postFormSubmitDone() {
  return {
    type: POST_FORM_SUBMIT_DONE
  }
}
