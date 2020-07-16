import React, { Component } from 'react'
import styled from 'styled-components'
import gold_img from '../../static/gold_bars.jpg'
import silver_img from '../../static/silver_bars.jpg'

import { 
    metalsUrl,
    metalsGold999Url, 
    metalsGold585Url, 
    metalsGold333Url,
    metalsSilver999Url,
    metalsSilver800Url,
    accountUrl
} from '../endpoints'
import { get, del, postAuth } from '../api'

const Row = styled.div`
  display: flex;
`

const Col = styled.div`
  flex: ${(props) => props.size};
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
  padding: 2px 5px;
  border-radius: 10px;
  background: red;
`

const ListTitle = styled.h1`
  margin: 10px;
  text-align: center;
  font-size: 1vw;
  font-family: Courgette, cursive;
`

// form styles
export const Form = styled.div`
  border: 1px solid gold;
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

export const TextArea = styled.textarea`
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
  &:hover { background: black; }
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

export default class Metals extends Component {
    constructor (props) {
      super(props)
      let name;
      if (this.props.resource === 'gold') {
          name = 'gold999'
      } else if (this.props.resource === 'silver') {
          name = 'silver999'
      }
      this.state = {
          MetalList: [],
          resource: {
              name: name,
              bought_price: '',
              bought_price_currency: '',
              amount: '',
              unit: 'oz',
              date_of_bought: '',
              description: ''
          },
      }
      this.collectMetals(this.props.resource)
      get(accountUrl, this.getCurrency)
    }

    getCurrency = (data) => {
        const res = this.state.resource
        res['bought_price_currency'] = data.my_currency
        this.setState({ resource: res })
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
        this.setState({MetalList: []})
        this.collectMetals(this.props.resource)
    }

    onSubmit = (id) => {
      del(metalsUrl + '/' + id, this.onDelete, )
    }

    onSubmitAdd = () => {
        postAuth(metalsUrl, this.state.resource, this.onAdd)
    }

    onAdd = () => {
        this.setState({MetalList: []})
        this.collectMetals(this.props.resource)
    }

    handleChange = (event) => {
        const res = this.state.resource
        res[event.target.name] = event.target.value
        this.setState({ resource: res })
    }

    render() {
        let options;
        let image;
        if (this.props.resource === 'gold') {
            options = <React.Fragment>
               <option value="gold999">gold999</option>
               <option value="gold585">gold585</option>
               <option value="gold333">gold333</option>
             </React.Fragment>
             image = <img src={gold_img} alt='gold' style={{'max-width': '50%', height: 'auto', margin: '50px'}} />
        } else if (this.props.resource === 'silver') {
            options = <React.Fragment>
              <option value="silver999">silver999</option>
              <option value="silver800">silver800</option>
             </React.Fragment>
             image = <img src={silver_img} alt='gold' style={{'max-width': '50%', height: 'auto', margin: '50px'}} />
        }

        return (
            <Row>
            <Col size={2}>
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
                        <DelButton onClick={() => this.onSubmit(metal.id)}>Delete</DelButton>
                    </Col>
                    </Row>
                  </MetalItem>
                ))}
                </Col>
            <Col size={3}>
                <ListTitle>Add new metal</ListTitle>
                <Form>
                    <Label>
                      <Select id="resource_name" name="name" onChange={this.handleChange}>
                        {options}
                      </Select>
                    </Label>
                    <br />
                    <Label>
                      <TextInput
                        type='number'
                        name='bought_price'
                        placeholder='bought price'
                        min="1"
                        onChange={this.handleChange}
                      />
                    </Label>
                    <br />
                    <Label>
                      <TextInput
                        type='number'
                        name='amount'
                        placeholder='amount'
                        min="1"
                        onChange={this.handleChange}
                      />
                    </Label>
                    <br />
                    <Label>
                    <Select id="resource_unit" name="unit" onChange={this.handleChange}>
                        <option value="oz">ounce</option>
                        <option value="g">gram</option>
                        <option value="kg">kilogram</option>
                      </Select>
                    </Label>
                    <br />
                    <Label>
                      <TextInput
                        type='date'
                        name='date_of_bought'
                        placeholder='date of bought'
                        value={this.state.resource.date_of_bought}
                        onChange={this.handleChange}
                      />
                    </Label>
                    <br />
                    <Label>
                      <TextArea
                        name="description"
                        rows="4"
                        cols="50"
                        onChange={this.handleChange}
                      >
                        description
                      </TextArea>
                    </Label>
                    <br />
                    <Button onClick={() => this.onSubmitAdd(this.state)}>Add</Button>
                  </Form>
                  </Col>
                  <Col size={4}>
                    {image}
                  </Col>
            </Row>
        )
    }
}