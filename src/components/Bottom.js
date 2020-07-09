import React from 'react'

export default function Bottom() {
  return (
    <footer style={bottomBeltStyle}>
      <p style={copyStyle}>&copy; Developed by RS</p>
    </footer>
  )
}

const bottomBeltStyle = {
  background: 'black',
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  weight: '100vw'
}

const copyStyle = {
  'text-align': 'center',
  padding: '10px'
}
