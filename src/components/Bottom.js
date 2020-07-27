import React from 'react'
import styled from 'styled-components'

export default function Bottom () {
  return (
    <BottomBelt>
      <p style={copyStyle}>&copy; Developed by RS</p>
    </BottomBelt>
  )
}

const BottomBelt = styled.footer`
  background: black;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: auto;
`

const copyStyle = {
  'text-align': 'center',
  padding: '10px'
}
