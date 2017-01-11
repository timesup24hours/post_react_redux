import { ADD_MESSAGE, CHAT_HISTORY } from './actionTypes'

import axios from 'axios'

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message
  }
}

export function setChatHistory(history) {
  return {
    type: CHAT_HISTORY,
    history
  }
}

export function requestChatHistory() {
  return dispatch => {
    return axios.get('/api/chat/chat_history').then( res => {
      if(res.data) dispatch(setChatHistory(res.data))
      if(res.data.empty) console.log('no message')
      if(res.data.err) console.log('loading message err: ', res.data.err)
    })
  }
}
