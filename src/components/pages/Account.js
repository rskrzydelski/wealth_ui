import React, { Component } from 'react'
import styled from 'styled-components'

import { accountUrl } from '../endpoints'
import { get } from '../api'

const Row = styled.div`
  display: flex;
`

const Col = styled.div`
  flex: ${(props) => props.size};
`

const Line = styled.hr`
  border-top: 1px solid gold;
  margin-bottom: 20px;
`

const UserCard = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid gold;
`

const CardText = styled.div`
  text-align: center;
  font-family: Courgette, cursive;
`

export default class Account extends Component {
  constructor (props) {
    super(props)
      this.state = {
        username: '',
        my_currency: '',
        email: '',
      }
      this.getUserData()
  }

  collectUserData = (data) => {
    this.setState({username: data.username, my_currency: data.my_currency, email: data.email})  
  }

  getUserData = () => {
    get(accountUrl, this.collectUserData)
  }

  render() {
    return (
      <Row>
        <Col size={1}>
          <UserCard>
            <CardText>Your account data:<br/></CardText>
            <Line />
            <CardText>username: {this.state.username}<br/></CardText>
            <CardText>your currency: {this.state.my_currency}<br/></CardText>
            <CardText>email: {this.state.email}<br/></CardText>
          </UserCard>
        </Col>
        <Col size={1}></Col>
        <Col size={1}></Col>
      </Row>
    )
  }
}
