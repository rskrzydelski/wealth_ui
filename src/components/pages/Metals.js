import React, { Component } from 'react'
import styled from 'styled-components'

import { 
    metalsUrl,
    metalsGold999Url, 
    metalsGold585Url, 
    metalsGold333Url,
    metalsSilver999Url,
    metalsSilver800Url,  
} from '../endpoints'
import { get, del } from '../api'

const Row = styled.div`
  display: flex;
`

const Col = styled.div`
  flex: ${(props) => props.size};
  margin: auto;
`

const MetalItem = styled.div`
  margin: 10px;
  font-family: Courgette, cursive;
  border-radius: 10px;
  border: 1px solid gold;
  max-width: 20vw;
  &:hover {
      background: black;
  }
`

const DelButton = styled.button`
  cursor: pointer;
  border-radius: 50%;
  padding: 2px 5px;
  background: red;
`

const ListTitle = styled.h1`
  margin: 10px;
  text-align: center;
  font-size: 1vw;
  font-family: Courgette, cursive;
`

export default class Metals extends Component {
    constructor (props) {
      super(props)
      console.log('aaa')
      this.state = {
          MetalList: [],
      }
      this.collectMetals(this.props.resource)
    }

    collectMetals = (resource) => {
        if (resource === 'gold') {
            get(metalsGold999Url, this.AddToMetalList)
            get(metalsGold585Url, this.AddToMetalList)
            get(metalsGold333Url, this.AddToMetalList)
    
        } else if (resource === 'silver') {
            get(metalsSilver999Url, this.AddToMetalList)
            get(metalsSilver800Url, this.AddToMetalList)
        }
    }

    AddToMetalList = (data) => {
        const MetalList = [...this.state.MetalList, ...data]
        this.setState({MetalList})
    }

    onDelete = () => {
        this.collectMetals(this.props.resource)
    }

    onSubmit = (id) => {
      del(metalsUrl + id, this.onDelete)
    }

    render() {
        return (
            <div>
                <ListTitle>List of your {this.props.resource}:</ListTitle>
                {this.state.MetalList.map((metal) => (
                  <MetalItem>
                  <Row>
                    <Col size={5}>
                    <p style={{margin: '5px'}}>
                      {metal.name}<br/>
                      Amount: {metal.amount} {metal.unit}<br/>
                      Bought price: {metal.bought_price}<br/>
                      Date of bought: {metal.date_of_bought.slice(0, 10)}
                    </p>
                    </Col>
                    <Col size={1}>
                        <DelButton onClick={() => this.onSubmit(metal.id)}>X</DelButton>
                    </Col>
                    </Row>
                  </MetalItem>
                ))}
            </div>
        )
    }
}