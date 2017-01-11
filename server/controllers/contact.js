import sendEmail from '../utils/sendEmail'

export const sendContactEmail = (req, res) => {
  const { title, content, email } = req.body
  let errors = {}
  if(!title) errors.title = 'Title is required!'
  if(title && title.length > 60) errors.title = 'Title should be less 60 characters!'
  if(title && title.length < 10) errors.title = 'Title could not be less 10 characters!'
  if(!content) errors.content = 'Content is required!'
  if(content && content.length > 1000) errors.content = 'Content should be less 1000 characters!'
  if(content && content.length < 40) errors.content = 'Content could not be less 40 characters!'
  if(!email) errors.email = 'Email is required!'
  if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address!'
  }
  // check if this is a empty object
  if(Object.keys(errors).length === 0) {
    sendEmail.sendContentEmail(title, content, email, function(err, success) {
      if(err) return res.json(err)
      res.json(success)
      return
    })
  } else {
    res.json({ errors: errors })
    return
  }
} // sendContactEmail
