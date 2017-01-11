import React from 'react'
import Cancel from 'material-ui/svg-icons/navigation/cancel'

export default (props) => {
  const { content, cancellable, show, email, handleHide, children } = props
  // let cancelHide = cancellable ? '' : 'cancel-hide'
  let notificationShow = show ? '' : 'notification-hide'

  return (
    <div className={`animated fadeIn notification ${notificationShow}`}>
      <div>
        {content}
        {children ? children : null}
        <strong>{email}</strong>
      </div>
      {cancellable
        ? <div onClick={handleHide} className={`cancel`}><Cancel /></div>
        : null }
    </div>
  )
}

// usage  note: parent container should be set 'position: relative'
// this.state = {
//   show: false
// }
//
// handleHide = () => {
//   this.setState({ show: !this.state.show })
//   return this.state.show
// }
//
// <Notification cancellable={true} handleHide={this.handleHide} show={this.state.show} content={`Your account has not been verified, We just sent your a verification link to ${'EMAIL'}`} />
