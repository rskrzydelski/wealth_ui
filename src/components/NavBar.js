import React from 'react'

import { Row, Col } from './pages/css/general'
import { HeaderStyle, StyledLink, StyledBrand } from './pages/css/navbar'

function NavBar (props) {
  const isAuth = props.isAuth
  if (isAuth) {
    return (
      <HeaderStyle>
        <Row>
          <Col size={1}>
            <StyledBrand>Wealthy app</StyledBrand>
          </Col>
          <Col size={3}>
            <StyledLink to='/'>Dashboard</StyledLink>
            <StyledLink to='/gold'>Gold</StyledLink>
            <StyledLink to='/silver'>Silver</StyledLink>
            <StyledLink to='/cash'>Cash</StyledLink>
            <StyledLink to='/my_account'>My Account</StyledLink>
            <StyledLink to='/logout'>Logout</StyledLink>
          </Col>
        </Row>
      </HeaderStyle>
    )
  }
  return (
    <HeaderStyle>
      <Row>
        <Col size={1}>
          <StyledBrand>Wealthy app</StyledBrand>
        </Col>
        <Col size={3}>
          <StyledLink to='/login'>Login</StyledLink>
          <StyledLink to='/register'>Sign up</StyledLink>
        </Col>
      </Row>
    </HeaderStyle>
  )
}

export default NavBar