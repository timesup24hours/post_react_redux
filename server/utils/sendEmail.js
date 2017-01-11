import { config } from '../../config'
import emailTemplate from '../utils/emailTemplate/emailTemplate'
const mailgun = require('mailgun-js')({apiKey: config.MAILGUN_API_KEY, domain: config.MAILGUN_DOMAIN})

export const sendVerificationEmail = (mailgun, token, email, subject, done) => {
  // create a URL which being sent to user's email for for verification
  const authenticationURL = config.DOMAIN + '/verify_email?token=' + token

  //mailgun
  const data = {
    from: 'Mailgun <' + config.MAILGUN_SMTP_LOGIN + '>',
    to: email,
    subject: subject,
    html: emailTemplate.VERIFICATION_EMAIL_TEMPLATE(authenticationURL)
  }

  mailgun.messages().send(data, function (error, body) {
    if(error) {
      return done({ err: 'Fail to send the email' }, false)
    }
    return done(null, { notVerify: 'Your account has not been verified, You will be received a verification link in few minutes, please check ' + email })
  })
} // sendVerificationEmail

export const sendResetPasswordEmail = (mailgun, token, email, subject, done) => {
  const resetPasswordURL = config.DOMAIN + '/reset_password?token=' + token

  const data = {
    from: 'Mailgun <' + config.MAILGUN_SMTP_LOGIN + '>',
    to: email,
    subject: subject,
    html: emailTemplate.RESET_PASSWORD_EMAIL_TEMPLATE(resetPasswordURL)
  }

  mailgun.messages().send(data, function (error, body) {
    if(error) {
      return done({ err: 'Fail to send the email' })
    }
    return done(null, { success: 'The reset password link will be sent to your email in few minutes, please check ' })
  })
} // sendResetPasswordEmail

export const sendContentEmail = (title, content, email, done) =>{
  const data = {
    from: 'From User <' + email + '>',
    // from: 'From User <' + email + '>',
    to: 'huanlinhuang@gmail.com',
    subject: title,
    text: content
  }

  mailgun.messages().send(data, function(error, body) {
    if(error) {
      return done({ err: 'Fail to send the email. please try it again.' })
    }
    return done(null, { success: 'You message has been sent! Thank you for contact us, we would review your message shortly.' })
  })
} // sendContentEmail
