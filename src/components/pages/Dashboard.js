import React, { Component } from 'react'
import styled from 'styled-components'
import Market from './Market'
import {
    walletGold999Url,
    walletGold585Url,
    walletGold333Url,
    walletSilver999Url,
    walletSilver800Url,
    walletCashUrl,
    walletUrl,
    accountUrl
} from '../endpoints'

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

const WallerCard = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid gold;
`

const CardText = styled.div`
  text-align: center;
  font-family: Courgette, cursive;
`

export default class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
        gold999: {value: '', cash_spend: '', profit: ''}, gold585: {value: '', cash_spend: '', profit: ''},
        gold333: {value: '', cash_spend: '', profit: ''}, silver999: {value: '', cash_spend: '', profit: ''},
        silver800: {value: '', cash_spend: '', profit: ''}, my_cash: {my_currency: '', cash: ''},
        wallet: {title: '', my_fortune: ''},
        my_currency: ''
    }
    this.getWalletData()
    get(accountUrl, this.getCurrency)
  }

  getCurrency = (data) => {
    if (data.my_currency === 'PLN') {
      this.setState({my_currency: 'zł'})
    } else if (data.my_currency === 'USD') {
      this.setState({my_currency: '$'})
    }
  }

  collectGold999Data = (data) => {
    var gold999 = {...this.state.gold999}
    gold999.value = data.metal_value
    gold999.cash_spend = data.cash_spend
    gold999.profit = data.profit
    this.setState({gold999})
  }

  collectGold585Data = (data) => {
    var gold585 = {...this.state.gold585}
    gold585.value = data.metal_value
    gold585.cash_spend = data.cash_spend
    gold585.profit = data.profit
    this.setState({gold585})
  }

  collectGold333Data = (data) => {
    var gold333 = {...this.state.gold333}
    gold333.value = data.metal_value
    gold333.cash_spend = data.cash_spend
    gold333.profit = data.profit
    this.setState({gold333})
  }

  collectGold333Data = (data) => {
    var gold333 = {...this.state.gold333}
    gold333.value = data.metal_value
    gold333.cash_spend = data.cash_spend
    gold333.profit = data.profit
    this.setState({gold333})
  }

  collectSilver999Data = (data) => {
    var silver999 = {...this.state.silver999}
    silver999.value = data.metal_value
    silver999.cash_spend = data.cash_spend
    silver999.profit = data.profit
    this.setState({silver999})
  }

  collectSilver800Data = (data) => {
    var silver800 = {...this.state.silver800}
    silver800.value = data.metal_value
    silver800.cash_spend = data.cash_spend
    silver800.profit = data.profit
    this.setState({silver800})
  }

  collectCashData = (data) => {
    var my_cash = {...this.state.cash}
    my_cash.my_currency = data.my_currency
    my_cash.cash = data.cash
    this.setState({my_cash})
  }

  collectFortune = (data) => {
    var wallet = {...this.state.wallet}
    wallet.title = data.title
    wallet.my_fortune = data.my_fortune
    this.setState({wallet})
  }

  getWalletData = () => {
      get(walletGold999Url, this.collectGold999Data)
      get(walletGold585Url, this.collectGold585Data)
      get(walletGold333Url, this.collectGold333Data)
      get(walletSilver999Url, this.collectSilver999Data)
      get(walletSilver800Url, this.collectSilver800Data)
      get(walletCashUrl, this.collectCashData)
      get(walletUrl, this.collectFortune)
  }

  componentDidMount () {
    const timer = 100 * 1000
    this.myInterval = setInterval(this.getWalletData, timer)
  }

  componentWillUnmount() {
      clearInterval(this.myInterval)
  }

  render() {
    return (
      <React.Fragment>
        <Market />
        <Line />
        <Row>
            <Col size={1}>
              <WallerCard>
                <CardText>
                  Gold 999<br/>
                  <hr/>
                  value {this.state.gold999.value} {this.state.my_currency}<br/>
                  cash spend {this.state.gold999.cash_spend} {this.state.my_currency}<br/>
                  {this.state.gold999.profit > 0 ? 
                  <span style={{color: '#00ff00'}}>profit {this.state.gold999.profit} {this.state.my_currency}</span> :
                  <span style={{color: 'red'}}>profit {this.state.gold999.profit} {this.state.my_currency}</span>
                  }
                </CardText>
              </WallerCard>
            </Col>
            <Col size={1}>
            <WallerCard>
              <CardText>
                Gold 585<br/>
                <hr/>
                value {this.state.gold585.value} {this.state.my_currency}<br/>
                cash spend {this.state.gold585.cash_spend} {this.state.my_currency}<br/>
                {this.state.gold585.profit > 0 ?
                <span style={{color: '#00ff00'}}>profit {this.state.gold585.profit} {this.state.my_currency}</span> :
                <span style={{color: 'red'}}>profit {this.state.gold585.profit} {this.state.my_currency}</span>
                }
              </CardText>
            </WallerCard>        
            </Col>
            <Col size={1}>
              <WallerCard>
                <CardText>
                  Gold 333<br/>
                  <hr/>
                  value {this.state.gold333.value} {this.state.my_currency}<br/>
                  cash spend {this.state.gold333.cash_spend} {this.state.my_currency}<br/>
                  {this.state.gold333.profit > 0 ?
                  <span style={{color: '#00ff00'}}>profit {this.state.gold333.profit}</span> :
                  <span style={{color: 'red'}}>profit {this.state.gold333.profit}</span>
                  }
                </CardText>
              </WallerCard>        
            </Col>
        </Row>
        <Row>
            <Col size={1}>
              <WallerCard>
                <CardText>
                  Silver 800<br/>
                  <hr/>
                  value {this.state.silver800.value} {this.state.my_currency}<br/>
                  cash spend {this.state.silver800.cash_spend} {this.state.my_currency}<br/>
                  {this.state.silver800.profit > 0 ?
                  <span style={{color: '#00ff00'}}>profit {this.state.silver800.profit} {this.state.my_currency}</span> :
                  <span style={{color: 'red'}}>profit {this.state.silver800.profit} {this.state.my_currency}</span>
                  }
                </CardText>
              </WallerCard>
            </Col>
            <Col size={1}>
              <WallerCard>
                <CardText>
                  Silver 999<br/>
                  <hr/>
                  value {this.state.silver999.value} {this.state.my_currency}<br/>
                  cash spend {this.state.silver999.cash_spend} {this.state.my_currency}<br/>
                  {this.state.silver999.profit > 0 ?
                  <span style={{color: '#00ff00'}}>profit {this.state.silver999.profit} {this.state.my_currency}</span> :
                  <span style={{color: 'red'}}>profit {this.state.silver999.profit} {this.state.my_currency}</span>
                  }
                </CardText>
              </WallerCard>        
            </Col>
            <Col size={1}>
              <WallerCard>
                <CardText>
                  Cash<br/>
                  <hr/>
                  <span style={{color: '#00ff00'}}>Cash {this.state.my_cash.cash} {this.state.my_currency}</span>
                </CardText>
              </WallerCard>
            </Col>
        </Row>
        <Row>
            <Col size={1}>
              <WallerCard>
                <CardText>
                  Summary value of all resources<br/>
                  <span style={{color: '#00ff00'}}>{this.state.wallet.my_fortune} {this.state.my_currency}</span>
                </CardText>
              </WallerCard>
            </Col>
        </Row>
      </React.Fragment>
    )
  }
}
