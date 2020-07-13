import React, { Component } from 'react'
import Axios from 'axios'
import styled from 'styled-components'
import Market from './Market'
import {
    walletGold999Url,
    walletGold585Url,
    walletGold333Url,
    walletSilver999Url,
    walletSilver800Url,
    walletCashUrl,
    walletUrl
} from '../endpoints'

const Grid = styled.div`

`

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
        wallet: {title: '', my_fortune: ''}
    }
    this.get(walletGold999Url)
    this.get(walletGold585Url)
    this.get(walletGold333Url)
    this.get(walletSilver999Url)
    this.get(walletSilver800Url)
    this.get(walletCashUrl)
    this.get(walletUrl)
  }

  setWalletData = (name, value, cash_spend, profit, my_currency, cash, title, my_fortune) => {
    if (name === 'All gold999') {
      var gold999 = {...this.state.gold999}
      gold999.value = value
      gold999.cash_spend = cash_spend
      gold999.profit = profit
      this.setState({gold999})
    } else if (name === 'All gold585') {
        var gold585 = {...this.state.gold585}
        gold585.value = value
        gold585.cash_spend = cash_spend
        gold585.profit = profit
        this.setState({gold585})
    } else if (name === 'All gold333') {
        var gold333 = {...this.state.gold333}
        gold333.value = value
        gold333.cash_spend = cash_spend
        gold333.profit = profit
        this.setState({gold333})
    } else if (name === 'All silver999') {
        var silver999 = {...this.state.silver999}
        silver999.value = value
        silver999.cash_spend = cash_spend
        silver999.profit = profit
        this.setState({silver999})
    } else if (name === 'All silver800') {
        var silver800 = {...this.state.silver800}
        silver800.value = value
        silver800.cash_spend = cash_spend
        silver800.profit = profit
        console.log(silver800)
        this.setState({silver800})
    } else if (cash !== undefined) {
        var my_cash = {...this.state.cash}
        my_cash.my_currency = my_currency
        my_cash.cash = cash
        this.setState({my_cash})
    } else if (title === 'Summary of all assets value') {
        var wallet = {...this.state.wallet}
        wallet.title = title
        wallet.my_fortune = my_fortune
        this.setState({wallet})
    }
}

  get = (url) => {
    Axios.get(url, {
        headers: {
          authorization: 'JWT ' + localStorage.getItem('access')
        }
    })
    .then((res) => {
        if (res.status === 200) {
            this.setWalletData(
                res.data.name, 
                res.data.metal_value, 
                res.data.cash_spend, 
                res.data.profit,
                res.data.my_currency,
                res.data.cash,
                res.data.title,
                res.data.my_fortune
                )
        } else {
            console.log(res.status)
        }
    })
  }

  getWalletData = () => {
    this.get(walletGold999Url)
    this.get(walletGold585Url)
    this.get(walletGold333Url)
    this.get(walletSilver999Url)
    this.get(walletSilver800Url)
    this.get(walletCashUrl)
    this.get(walletUrl)
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
                  value {this.state.gold999.value}<br/>
                  cash spend {this.state.gold999.cash_spend}<br/>
                  {this.state.gold999.profit > 0 ? 
                  <span style={{color: '#00ff00'}}>profit {this.state.gold999.profit}</span> :
                  <span style={{color: 'red'}}>profit {this.state.gold999.profit}</span>
                  }
                </CardText>
              </WallerCard>
            </Col>
            <Col size={1}>
            <WallerCard>
              <CardText>
                Gold 585<br/>
                <hr/>
                value {this.state.gold585.value}<br/>
                cash spend {this.state.gold585.cash_spend}<br/>
                {this.state.gold585.profit > 0 ?
                <span style={{color: '#00ff00'}}>profit {this.state.gold585.profit}</span> :
                <span style={{color: 'red'}}>profit {this.state.gold585.profit}</span>
                }
              </CardText>
            </WallerCard>        
            </Col>
            <Col size={1}>
              <WallerCard>
                <CardText>
                  Gold 333<br/>
                  <hr/>
                  value {this.state.gold333.value}<br/>
                  cash spend {this.state.gold333.cash_spend}<br/>
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
                  value {this.state.silver800.value}<br/>
                  cash spend {this.state.silver800.cash_spend}<br/>
                  {this.state.silver800.profit > 0 ?
                  <span style={{color: '#00ff00'}}>profit {this.state.silver800.profit}</span> :
                  <span style={{color: 'red'}}>profit {this.state.silver800.profit}</span>
                  }
                </CardText>
              </WallerCard>
            </Col>
            <Col size={1}>
              <WallerCard>
                <CardText>
                  Silver 999<br/>
                  <hr/>
                  value {this.state.silver999.value}<br/>
                  cash spend {this.state.silver999.cash_spend}<br/>
                  {this.state.silver999.profit > 0 ?
                  <span style={{color: '#00ff00'}}>profit {this.state.silver999.profit}</span> :
                  <span style={{color: 'red'}}>profit {this.state.silver999.profit}</span>
                  }
                </CardText>
              </WallerCard>        
            </Col>
            <Col size={1}>
              <WallerCard>
                <CardText>
                  Cash<br/>
                  <hr/>
                  <span style={{color: '#00ff00'}}>Cash {this.state.my_cash.cash} {this.state.my_cash.my_currency}</span>
                </CardText>
              </WallerCard>
            </Col>
        </Row>
        <Row>
            <Col size={1}>
              <WallerCard>
                <CardText>
                  Summary value of all resources<br/>
                  <span style={{color: '#00ff00'}}>{this.state.wallet.my_fortune} PLN</span>
                </CardText>
              </WallerCard>
            </Col>
        </Row>
      </React.Fragment>
    )
  }
}
