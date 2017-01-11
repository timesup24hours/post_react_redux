import axios from 'axios'

export function sendContactEmail(data) {
  return dispatch => {
    return axios.post('/api/contact/send_contact_email', data)
  }
}
