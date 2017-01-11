import axios from 'axios'

export function resetPassword(token, password) {
  return dispatch => {
    return axios.post('/api/reset_password?token=' + token, password)
  }
}
