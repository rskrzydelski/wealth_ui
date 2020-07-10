import React, { Component } from 'react'
import Axios from 'axios'
import styled from 'styled-components'

import { gold999ozUrl, gold585gUrl, silver999ozUrl, silver800gUrl } from '../endpoints'

import gold_ico from '../../static/gold_ico.png'
import gold585_ico from '../../static/gold_585_ico.png'
import silver_ico from '../../static/silver_ico.png'
import silver800_ico from '../../static/silver_800_ico.png'

const Grid = styled.div`

`

const Row = styled.div`
  display: flex;
`

const Col = styled.div`
  flex: ${(props) => props.size};
`

const MarketContainer = styled.div`
  alignt-text: center;
  margin: 10px;
  ${'' /* border-radius: 10px; */}
  ${'' /* border: 1px solid gold; */}
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
            }
        }
        this.getMarketData()
      }

  setMetalprice = (name, unit, price) => {
      if (name+unit === 'gold999oz') {
        var market = {...this.state.market}
        market.gold999oz = price;
        this.setState({market})
      } else if (name+unit === 'gold585g') {
        var market = {...this.state.market}
        market.gold585g = price;
        this.setState({market})
      } else if (name+unit === 'silver999oz') {
        var market = {...this.state.market}
        market.silver999oz = price;
        this.setState({market})
      } else if (name+unit === 'silver800g') {
        var market = {...this.state.market}
        market.silver800g = price;
        this.setState({market})
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
            this.setMetalprice(res.data.name, res.data.unit, res.data.price)
        } else {
            console.log(res.status)
        }
    })
  }

  getMarketData = () => {
    this.get(gold999ozUrl)
    this.get(gold585gUrl)
    this.get(silver999ozUrl)
    this.get(silver800gUrl)
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
                <MarketText>Gold 999 oz: {this.state.market.gold999oz} zł</MarketText>
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
                <MarketText>Gold 585 g: {this.state.market.gold585g} zł</MarketText>
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
                <MarketText>Silver 999 oz: {this.state.market.silver999oz} zł</MarketText>
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
                <MarketText>Silver 800 g: {this.state.market.silver800g} zł</MarketText>
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
