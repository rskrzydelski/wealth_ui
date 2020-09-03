import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeaderStyle = styled.header`
  height: auto;
  background: #000;
  padding: 20px;
  text-align: right;
`

export const StyledLink = styled(Link)`
  margin-left: 10px;
  margin-right: 10px;
  color: gold;
  font-family: Courgette, cursive;
  font-size: 0.8rem;
  text-decoration: none;
  &:hover {
      color: white;
  }
`

export const StyledBrand = styled.h1`
    color: white;
    text-align: left;
    font-family: 'Indie Flower', cursive;
    font-size: 0.8rem;
    &:hover {
      color: gold;
    }
`
