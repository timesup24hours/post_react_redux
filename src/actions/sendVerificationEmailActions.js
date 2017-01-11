import axios from 'axios'

export function sendVerificationEmail(email) {
  return dispatch => {
    return axios.post('/api/send_verify_email', email)
  }
}
