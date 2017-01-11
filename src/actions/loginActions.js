import axios from 'axios'

export function submitLogin(data) {
  return dispatch => {
    return axios.post('/api/login', data)
  }
}
