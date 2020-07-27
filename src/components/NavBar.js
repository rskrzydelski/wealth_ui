import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Grid = styled.div`

`

const Row = styled.div`
  display: flex;
`

const Col = styled.div`
  flex: ${(props) => props.size};
`

const HeaderStyle = styled.header`
  height: auto;
  background: #000;
  padding: 20px;
  text-align: right;
`

const StyledLink = styled(Link)`
  margin-left: 10px;
  margin-right: 10px;
  color: gold;
  font-family: Courgette, cursive;
  text-decoration: none;
  &:hover {
      color: white;
  }
`
const StyledBrand = styled.h1`
    color: white;
    text-align: left;
    font-family: 'Indie Flower', cursive;
    font-size: 1.5rem;
    &:hover {
      color: gold;
    }
`

function NavBar(props) {
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