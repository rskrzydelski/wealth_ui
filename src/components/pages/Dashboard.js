import React, { Component } from 'react'
import { Table } from '../Table'
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

import { Line } from './css/general'
import { TableWrapper, Profit, Value, Spend } from './css/dashboard'

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
        } else if (res.data.my_currency === 'EUR') {
          this.setState({my_currency: '€'})
        } else if (res.data.my_currency === 'CHF') {
          this.setState({my_currency: 'chf'})
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

    const columns = [
        {
          Header: 'My wallet',
          columns: [
            {
              Header: 'resource',
              accessor: 'name',
            },
            {
              Header: 'value',
              accessor: 'value',
            },
            {
              Header: 'cash spend',
              accessor: 'cash',
            },
            {
              Header: 'profit',
              accessor: 'profit',
            },
          ],
        },
      ]

    const data = [
      {
        name: "GOLD (999)", 
        value: <Value>{this.state.gold999.value + ' ' + this.state.my_currency}</Value>, 
        cash: <Spend>{this.state.gold999.cash_spend + ' ' + this.state.my_currency}</Spend>, 
        profit: <Profit profit={this.state.gold999.profit}>{this.state.gold999.profit + ' ' + this.state.my_currency}</Profit>
      },
      {
        name: "GOLD (585)", 
        value: <Value>{this.state.gold585.value + ' ' + this.state.my_currency}</Value>, 
        cash: <Spend>{this.state.gold585.cash_spend + ' ' + this.state.my_currency}</Spend>, 
        profit: <Profit profit={this.state.gold585.profit}>{this.state.gold585.profit + ' ' + this.state.my_currency}</Profit>
      },
      {
        name: "GOLD (333)", 
        value: <Value>{this.state.gold333.value + ' ' + this.state.my_currency}</Value>, 
        cash: <Spend>{this.state.gold333.cash_spend + ' ' + this.state.my_currency}</Spend>, 
        profit: <Profit profit={this.state.gold333.profit}>{this.state.gold333.profit + ' ' + this.state.my_currency}</Profit>
      },
      {
        name: "SILVER (999)", 
        value: <Value>{this.state.silver999.value + ' ' + this.state.my_currency}</Value>, 
        cash: <Spend>{this.state.silver999.cash_spend + ' ' + this.state.my_currency}</Spend>, 
        profit: <Profit profit={this.state.silver999.profit}>{this.state.silver999.profit + ' ' + this.state.my_currency}</Profit>
      },
      {
        name: "SILVER (800)", 
        value: <Value>{this.state.silver800.value + ' ' + this.state.my_currency}</Value>, 
        cash: <Spend>{this.state.silver800.cash_spend + ' ' + this.state.my_currency}</Spend>, 
        profit: <Profit profit={this.state.silver800.profit}>{this.state.silver800.profit + ' ' + this.state.my_currency}</Profit>
      },
      {
        name: "NEO", 
        value: <Value>{0 + ' ' + this.state.my_currency}</Value>, 
        cash: <Spend>{0}</Spend>, 
        profit: <Profit profit={0}>0</Profit>
      },
      {
        name: "ETH", 
        value: <Value>{0 + ' ' + this.state.my_currency}</Value>, 
        cash: <Spend>{0}</Spend>, 
        profit: <Profit profit={0}>0</Profit>
      },
      {
        name: "FLM", 
        value: <Value>{0 + ' ' + this.state.my_currency}</Value>, 
        cash: <Spend>{0}</Spend>, 
        profit: <Profit profit={0}>0</Profit>
      },
      {
        name: "LCC", 
        value: <Value>{0 + ' ' + this.state.my_currency}</Value>, 
        cash: <Spend>{0}</Spend>, 
        profit: <Profit profit={0}>0</Profit>
      },
      {
        name: "CASH",
        value: <Value>{this.state.my_cash.cash + ' ' + this.state.my_currency}</Value>,
        cash: "---",
        profit: "---"
      },
      {
        name: "SUMMARY",
        value: <Value>{this.state.wallet.my_fortune + ' ' + this.state.my_currency}</Value>,
        cash: "---",
        profit: "---"
      }
    ]

    return (
      <React.Fragment>
        <Market />
        <Line />
        <TableWrapper>
          <Table columns={columns} data={data} />
        </TableWrapper>
      </React.Fragment>
    )
  }
}
