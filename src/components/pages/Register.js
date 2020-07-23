import React, { Component } from 'react'
import styled from 'styled-components'

import { registerUrl } from '../endpoints'
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

const Select = styled.select`
  width: 50%;
  background: #232632;
  color: gray;
  font-size: 12px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
       option {
         color: white;
         background: #232632;
         font-weight: small;
       }
`;

export default class Logout extends Component {
    constructor (props) {
      super(props)
      this.state = {
        data: { username: '', email: '', password: '', re_password: '', my_currency: '' }
      }
      console.log(this.state)
    }

    GoToLogin = (data) => {
      const { history } = this.props
      history.push('/login')
    }

    registerUser = (username, email, password, re_password, my_currency) => {
      post(
          registerUrl,
          {username: username, email: email, password: password, re_password: re_password, my_currency: my_currency},
          this.GoToLogin
          )
    }

    onSubmit = (value) => {
        this.registerUser(this.state.data.username, this.state.data.email, this.state.data.password, this.state.data.re_password, this.state.data.my_currency)
        this.setState({
            data: { username: '', email: '', password: '', re_password: '', my_currency: '' }
          })
    }

    handleChange = (event) => {
        const data = this.state.data
        data[event.target.name] = event.target.value
        this.setState({ data: data })
    }

    render() {
        return (
            <Row>
                <Col size={1}>
                  <Form>
                    <Label>
                      <TextInput
                        type='text'
                        name='username'
                        placeholder='username'
                        value={this.state.data.username}
                        onChange={this.handleChange}
                      />
                    </Label>
                    <br />
                    <Label>
                      <TextInput
                        type='email'
                        name='email'
                        placeholder='email'
                        value={this.state.data.email}
                        onChange={this.handleChange}
                      />
                    </Label>
                    <br />
                    <Label>
                      <TextInput
                        type='password'
                        name='password'
                        placeholder='password'
                        value={this.state.data.password}
                        onChange={this.handleChange}
                      />
                    </Label>
                    <br />
                    <Label>
                      <TextInput
                        type='password'
                        name='re_password'
                        placeholder='re_password'
                        value={this.state.data.re_password}
                        onChange={this.handleChange}
                      />
                    </Label>
                    <br />
                    <Label>
                      <Select id="currency" name="my_currency" onChange={this.handleChange}>
                        <option value="PLN">PLN</option>
                        <option value="USD">USD</option>
                        <option value="CHF">CHF</option>
                        <option value="EUR">EUR</option>
                      </Select>
                    </Label>
                    <br />
                    <Button onClick={() => this.onSubmit(this.state)}>Register</Button>
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
