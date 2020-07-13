import React, { Component } from 'react'
import styled from 'styled-components'

import { gold999ozUrl, gold585gUrl, silver999ozUrl, silver800gUrl, accountUrl } from '../endpoints'
import { get } from '../api'

import gold_ico from '../../static/gold_ico.png'
import gold585_ico from '../../static/gold_585_ico.png'
import silver_ico from '../../static/silver_ico.png'
import silver800_ico from '../../static/silver_800_ico.png'

const Row = styled.div`
  display: flex;
`

const Col = styled.div`
  flex: ${(props) => props.size};
`

const MarketContainer = styled.div`
  alignt-text: center;
  margin: 10px;
  height: 50%;
`
const MarketText = styled.div`
  text-align: center;
  font-family: Courgette, cursive;
  margin-top: 2%;
`

export default class Market extends Component {
    constructor (props) {
        super(props)
        this.state = {
            market: {
                gold999oz: '',
                gold585g: '',
                silver999oz: '',
                silver800g: ''
            },
            my_currency: ''
        }
        this.getMarketData()
        get(accountUrl, this.getCurrency)
      }

  getCurrency = (data) => {
    if (data.my_currency === 'PLN') {
      this.setState({my_currency: 'zł'})
      } else if (data.my_currency === 'USD') {
        this.setState({my_currency: '$'})
      }
  }

  collectMarketGold999 = (data) => {
    var market = {...this.state.market}
    market.gold999oz = data.price;
    this.setState({market})
  }

  collectMarketGold585 = (data) => {
    var market = {...this.state.market}
    market.gold585g = data.price;
    this.setState({market})
  }

  collectMarketSilver999 = (data) => {
    var market = {...this.state.market}
    market.silver999oz = data.price;
    this.setState({market})
  }

  collectMarketSilver800 = (data) => {
    var market = {...this.state.market}
    market.silver800g = data.price;
    this.setState({market})
  }

  getMarketData = () => {
    get(gold999ozUrl, this.collectMarketGold999)
    get(gold585gUrl, this.collectMarketGold585)
    get(silver999ozUrl, this.collectMarketSilver999)
    get(silver800gUrl, this.collectMarketSilver800)
  }

  componentDidMount () {
    const timer = 60 * 1000
    this.myInterval = setInterval(this.getMarketData, timer)
  }

  componentWillUnmount() {
      clearInterval(this.myInterval)
  }

  render() {
    return (
      <Row>
        <Col size={1}>
          <MarketContainer>
            <Row>
              <Col size={2}>
                <MarketText>Gold 999 oz: {this.state.market.gold999oz} {this.state.my_currency}</MarketText>
              </Col>
              <Col size={1}>
                <img src={gold_ico} alt='gold 999' style={{'max-width': '50%', height: 'auto'}} />
              </Col>
            </Row>
          </MarketContainer>
        </Col>
        <Col size={1}>
          <MarketContainer>
            <Row>
              <Col size={2}>
                <MarketText>Gold 585 g: {this.state.market.gold585g} {this.state.my_currency}</MarketText>
              </Col>
              <Col size={1}>
                <img src={gold585_ico} alt='gold 585' style={{'max-width': '30%', height: 'auto'}} />
              </Col>
            </Row>
          </MarketContainer>
        </Col>
        <Col size={1}>
          <MarketContainer>
            <Row>
              <Col size={2}>
                <MarketText>Silver 999 oz: {this.state.market.silver999oz} {this.state.my_currency}</MarketText>
              </Col>
              <Col size={1}>
                <img src={silver_ico} alt='silver 999' style={{'max-width': '40%', height: 'auto'}} />
              </Col>
            </Row>
          </MarketContainer>
        </Col>
        <Col size={1}>
          <MarketContainer>
            <Row>
              <Col size={2}>
                <MarketText>Silver 800 g: {this.state.market.silver800g} {this.state.my_currency}</MarketText>
              </Col>
              <Col size={1}>
                <img src={silver800_ico} alt='silver 800' style={{'max-width': '30%', height: 'auto'}} />
              </Col>
            </Row>
          </MarketContainer>
        </Col>
      </Row>
    )
  }
}
