import axios from 'axios'

export function verfiyEmail(token) {
  return dispatch => {
    return axios.get('/api/verify_email?token=' + token)
  }
}
