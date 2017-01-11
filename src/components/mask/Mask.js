import React from 'react'
import CircularProgress from 'material-ui/CircularProgress';

export default (props) => {
  const { show, showCircle, children } = props

  if(show) {
    return (
      <div className='mask'>
        {children
          ? <div style={{ position: 'relative' }}>
              {children}
            </div>
          : null}
        {showCircle ? <CircularProgress size={60} thickness={7} /> : null}
      </div>
    )
  } else {
    return null
  }

}
