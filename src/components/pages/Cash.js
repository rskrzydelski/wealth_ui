import React, { Component } from 'react'
import Axios from 'axios'

import { Row, Col } from './css/general'
import { Submit, Form, Label, TextInput } from './css/form'
import { ListTitle, CashItem, DelButton } from './css/cash'
import cash from '../../static/franc.jpg'

import { 
    cashUrl,
    accountUrl,
    refreshTokenUrl
} from '../endpoints'

export default class Cash extends Component {
    constructor (props) {
      super(props)
      this.state = {
          CashList: [],
          cash: {
            my_cash: '',
            save_date: '',
        },
        my_currency: '',
      }
    }

    componentDidMount () {
      this.getCurrency()
      this.collectCash()
    }

    getCurrency = async () => {
      try {
          const res = await Axios.get(accountUrl, {headers: {authorization: 'JWT ' + localStorage.getItem('access')}})
          if (res.data.my_currency === 'PLN') {
            this.setState({my_currency: 'zł'})
          } else if (res.data.my_currency === 'USD') {
            this.setState({my_currency: '$'})
          } else if (res.data.my_currency === 'EUR') {
            this.setState({my_currency: '€'})
          } else if (res.data.my_currency === 'CHF') {
            this.setState({my_currency: 'chf'})
          }
      } catch (error) {  
      }
    }

    collectCash = async () => {
      try {
            const res = await Axios.get(cashUrl, {headers: {authorization: 'JWT ' + localStorage.getItem('access')}})
            console.log(res)
            const CashList = [...this.state.CashList, ...res.data]
            this.setState({CashList})
        } catch (error) {
            if (error.response.status === 401) {
                const res = await Axios.post(refreshTokenUrl, {refresh: localStorage.getItem('refresh')})
                localStorage.setItem('access', res.data.access)
                this.collectCash()
              }
        }
    }

    onSubmitDel = async (e, id) => {
      e.preventDefault()
      try {
          await Axios.delete(cashUrl + '/' + id, {headers: {authorization: 'JWT ' + localStorage.getItem('access')}})
          this.setState({CashList: []})
          this.collectCash()
      } catch (error) {
          if (error.response.status === 401) {
              const res = await Axios.post(refreshTokenUrl, {refresh: localStorage.getItem('refresh')})
              localStorage.setItem('access', res.data.access)
              this.onSubmitDel(e, id)
            }
      }
    }

  onSubmitAdd = async (e) => {
      e.preventDefault()
      try {
          await Axios.post(cashUrl, this.state.cash, {headers: {authorization: 'JWT ' + localStorage.getItem('access')}})
          this.setState({CashList: []})
          this.collectCash()
      } catch (error) {
          if (error.response.status === 401) {
              const res = await Axios.post(refreshTokenUrl, {refresh: localStorage.getItem('refresh')})
              localStorage.setItem('access', res.data.access)
              this.onSubmitAdd(e)
            }
      }
  }


    handleFormInput = (event) => {
        const res = this.state.cash
        res[event.target.name] = event.target.value
        this.setState({ cash: res })
    }

    render() {
        return (
            <Row>
            <Col size={2}>
                <ListTitle>List of your cash:</ListTitle>
                {this.state.CashList.map((cash) => (
                  <CashItem>
                  <Row>
                    <Col size={5}>
                    <p style={{margin: '5px'}}>
                       My cash: {cash.my_cash} {this.state.my_currency}<br/>
                       Save date: {cash.save_date.slice(0, 10)}
                    </p>
                    </Col>
                    <Col size={1}>
                        <DelButton onClick={(e) => this.onSubmitDel(e, cash.id)}>Delete</DelButton>
                    </Col>
                    </Row>
                  </CashItem>
                ))}
                </Col>
            <Col size={3}>
                <ListTitle>Add new cash</ListTitle>
                <Form>
                    <Label>
                      <TextInput
                        type='number'
                        name='my_cash'
                        placeholder='my cash'
                        min="1"
                        onChange={this.handleFormInput}
                      />
                    </Label>
                    <br />
                    <Label>
                      <TextInput
                        type='date'
                        name='save_date'
                        placeholder='save date'
                        value={this.state.cash.save_date}
                        onChange={this.handleFormInput}
                      />
                    </Label>
                    <br />
                    <Submit onClick={(e) => this.onSubmitAdd(e, this.state)}>Add</Submit>
                  </Form>
                  </Col>
                  <Col size={4}>
                    <img src={cash} alt='cash' style={{'max-width': '50%', height: 'auto', margin: '50px'}} />
                  </Col>
            </Row>
        )
    }
}