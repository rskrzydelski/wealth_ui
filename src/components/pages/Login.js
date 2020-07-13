import React, { Component } from 'react'
import styled from 'styled-components'

import { loginUrl } from '../endpoints'
import { post } from '../api'

const Row = styled.div`
  display: flex;
`

const Col = styled.div`
  flex: ${(props) => props.size};
`

export const Welcome = styled.div`
  background: #111519;
  margin-right: 10px;
  margin-top: 50px;
  margin-left: 50px;
`

export const Paragraf = styled.p`
  font-size: 15px;
  font-family: 'Courgette', cursive;
`

export const Form = styled.div`
  background: #2b2e39;
  text-align: center;
  border-radius: 14px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 10px;
`

export const Label = styled.label`
  margin-top: 10px;
  font-size: 14px;
`

export const TextInput = styled.input`
  padding: 5px;
  border-radius: 10px;
  font-size: 12px;
  background: #232632;
  color: #d3d4d6;
  width: 50%;
  margin-top: 10px;
  margin-right: 7px;
  margin-bottom: 10px;
  text-algin: center;
`

export const Button = styled.button`
  background: #232632;
  border-radius: 10px;
  color: gold;
  width: 30%;
  height: 32px;
  font-size: 0.9em;
  margin: 10px auto;
  justify-content: center;
  align-items: center;
  border: 1px solid gold;
  &:hover { background: #555; }
`

export default class Login extends Component {
    constructor (props) {
      super(props)
      this.state = {
        credentials: { email: '', password: '' }
      }
    }

    Authenticate = (data) => {
      const { history } = this.props
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      this.props.isAuthenticated(true)
      history.push('/')
    }

    loginUser = (email, password) => {
      post(loginUrl, {email: email, password: password}, this.Authenticate)
    }

    onSubmit = (value) => {
        this.loginUser(this.state.credentials.email, this.state.credentials.password)
        this.setState({
            credentials: { email: '', password: '' }
          })
    }

    handleChange = (event) => {
        const cr = this.state.credentials
        cr[event.target.name] = event.target.value
        this.setState({ credentials: cr })
    }

    render() {
        return (
            <Row>
                <Col size={1}>
                  <Form>
                    <Label>
                      <TextInput
                        type='email'
                        name='email'
                        placeholder='email'
                        value={this.state.credentials.email}
                        onChange={this.handleChange}
                      />
                    </Label>
                    <br />
                    <Label>
                      <TextInput
                        type='password'
                        name='password'
                        placeholder='password'
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                      />
                    </Label>
                    <br />
                    <Button onClick={() => this.onSubmit(this.state)}>Login</Button>
                  </Form>
                </Col>
                <Col size={3}>
                  <Welcome>
                    <Paragraf>Wealth is application for store resources such as gold, silver, cash.</Paragraf>
                    <Paragraf>You can add your gold, silver and cash, see current price, see how money you spend</Paragraf>
                    <Paragraf>on particular resource or on all resources and finally see your profit or your lost.</Paragraf>
                    <Paragraf>Currently you can choose following currencies: PLN, USD, CHF, EUR.</Paragraf>
                  </Welcome>
                </Col>
            </Row>
        )
    }
}
