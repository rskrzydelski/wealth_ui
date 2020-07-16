import React, { Component } from 'react'
import styled from 'styled-components'

import { 
    cashUrl,

} from '../endpoints'
import { get, del } from '../api'

const Row = styled.div`
  display: flex;
`

const Col = styled.div`
  flex: ${(props) => props.size};
  margin: auto;
`

const CashItem = styled.div`
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

export default class Cash extends Component {
    constructor (props) {
      super(props)
      this.state = {
          CashList: [],
      }
      get(cashUrl, this.AddToCashList)
    }

    AddToCashList = (data) => {
        const CashList = [...this.state.CashList, ...data]
        this.setState({CashList})
    }

    onDelete = () => {
        get(cashUrl, this.AddToCashList)
    }

    onSubmit = (id) => {
      del(cashUrl + id, this.onDelete)
    }

    render() {
        return (
            <div>
                <ListTitle>List of your cash:</ListTitle>
                {this.state.CashList.map((cash) => (
                  <CashItem>
                  <Row>
                    <Col size={5}>
                    <p style={{margin: '5px'}}>
                       My cash: {cash.my_cash} {cash.my_currency}<br/>
                       Save date: {cash.save_date.slice(0, 10)}
                    </p>
                    </Col>
                    <Col size={1}>
                        <DelButton onClick={() => this.onSubmit(cash.id)}>X</DelButton>
                    </Col>
                    </Row>
                  </CashItem>
                ))}
            </div>
        )
    }
}