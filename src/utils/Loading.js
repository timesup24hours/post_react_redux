import React from 'react'
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh'
}

export default () => {
  return (
    <div style={style}>
      <CircularProgress size={50} thickness={4} />
    </div>
  )
}
