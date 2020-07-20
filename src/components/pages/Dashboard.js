import React, { Component } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import Market from './Market'
import {
    walletGold999Url,
    walletGold585Url,
    walletGold333Url,
    walletSilver999Url,
    walletSilver800Url,
    walletCashUrl,
    walletUrl,
    accountUrl,
    refreshTokenUrl
} from '../endpoints'

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
  }

  getCurrency = async () => {
    try {
        const res = await Axios.get(accountUrl, {headers: {authorization: 'JWT ' + localStorage.getItem('access')}})
        if (res.data.my_currency === 'PLN') {
          this.setState({my_currency: 'zł'})
        } else if (res.data.my_currency === 'USD') {
          this.setState({my_currency: '$'})
      }
    } catch (error) {

    }
  }

  getWalletData = async () => {
    try {
      const gold999WalletPromise = Axios(walletGold999Url, {headers: {authorization: 'JWT ' + localStorage.getItem('access')}})
      const gold585WalletPromise = Axios(walletGold585Url, {headers: {authorization: 'JWT ' + localStorage.getItem('access')}})
      const gold333WalletPromise = Axios(walletGold333Url, {headers: {authorization: 'JWT ' + localStorage.getItem('access')}})
      const silver999WalletPromise = Axios(walletSilver999Url, {headers: {authorization: 'JWT ' + localStorage.getItem('access')}})
      const silver800WalletPromise = Axios(walletSilver800Url, {headers: {authorization: 'JWT ' + localStorage.getItem('access')}})
      const cashWalletPromise = Axios(walletCashUrl, {headers: {authorization: 'JWT ' + localStorage.getItem('access')}})
      const walletPromise = Axios(walletUrl, {headers: {authorization: 'JWT ' + localStorage.getItem('access')}})

      const res = await Promise.all([gold999WalletPromise, gold585WalletPromise, gold333WalletPromise, silver999WalletPromise, silver800WalletPromise, cashWalletPromise, walletPromise])

      var gold999 = {...this.state.gold999}
      gold999.value = res[0].data.metal_value
      gold999.cash_spend = res[0].data.cash_spend
      gold999.profit = res[0].data.profit
      this.setState({gold999})

      var gold585 = {...this.state.gold585}
      gold585.value = res[1].data.metal_value
      gold585.cash_spend = res[1].data.cash_spend
      gold585.profit = res[1].data.profit
      this.setState({gold585})

      var gold333 = {...this.state.gold333}
      gold333.value = res[2].data.metal_value
      gold333.cash_spend = res[2].data.cash_spend
      gold333.profit = res[2].data.profit
      this.setState({gold333})

      var silver999 = {...this.state.silver999}
      silver999.value = res[3].data.metal_value
      silver999.cash_spend = res[3].data.cash_spend
      silver999.profit = res[3].data.profit
      this.setState({silver999})

      var silver800 = {...this.state.silver800}
      silver800.value = res[4].data.metal_value
      silver800.cash_spend = res[4].data.cash_spend
      silver800.profit = res[4].data.profit
      this.setState({silver800})

      var my_cash = {...this.state.cash}
      my_cash.my_currency = res[5].data.my_currency
      my_cash.cash = res[5].data.cash
      this.setState({my_cash})

      var wallet = {...this.state.wallet}
      wallet.title = res[6].data.title
      wallet.my_fortune = res[6].data.my_fortune
      this.setState({wallet})
    } catch (error) {
      if (error.response.status === 401) {
        const res = await Axios.post(refreshTokenUrl, {refresh: localStorage.getItem('refresh')})
        localStorage.setItem('access', res.data.access)
        this.getWalletData()
      }
    }
  }

  componentDidMount () {
    this.getWalletData()
    this.getCurrency()
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
