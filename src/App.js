import React, { Component } from 'react'
import Axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import Bottom from './components/Bottom'
import NavBar from './components/NavBar'
import Dashboard from './components/pages/Dashboard'
import Gold from './components/pages/Gold'
import Silver from './components/pages/Silver'
import Cash from './components/pages/Cash'
import Crypto from './components/pages/Crypto'
import Login from './components/pages/Login'
import Logout from './components/pages/Logout'
import Register from './components/pages/Register'
import Account from './components/pages/Account'
import { verifyTokenUrl } from './components/endpoints'
import { MainWrapper, Wrapper } from './components/pages/css/app'

const PrivateRoute = ({ component: Component, isAuth }) => (
  <Route render={props => isAuth === true
    ? <Component {...props} />
    : <Redirect to={{ pathname: '/login' }} />}
  />
)

class App extends Component {
  constructor (props) {
    super(props)
    let checkAuthAfterRefresh;
    if (localStorage.getItem("access") !== null) {
      (async () => {
        checkAuthAfterRefresh = await this.verifyToken(localStorage.getItem("access"))
        if (checkAuthAfterRefresh === true) {
          this.isAuthenticated(true)
        } else {
          localStorage.clear()
          this.isAuthenticated(false)
        }
      })()
    }
    this.state = {
      isAuth: false
    }
  }

  verifyToken = async (token) => {
    try {
        const res = await Axios.post(verifyTokenUrl, {token: token})
        if (res.status === 200) {
          return true
        }
    } catch (error) {
        if (error.response.status === 401) {
           console.log("401 unauthorized")
          }
        return false
    }
  }

  isAuthenticated = (isAuth) => {
    if (isAuth) {
      this.setState({isAuth: true})
    } else {
      this.setState({isAuth: false})
    }
  }

  render () {
    return (
      <MainWrapper>
        <Router>
          <Wrapper>
            <NavBar isAuth={this.state.isAuth} />
            <Switch>
              <Route path='/login' render={ props => (<Login isAuthenticated={this.isAuthenticated} isAuth={this.state.isAuth} {...props}  /> )} />
              <Route path='/logout' render={ props => (<Logout isAuthenticated={this.isAuthenticated}/> )} />
              <Route path='/register' render={(props) => (<Register {...props}/>)} />

              <PrivateRoute exact path='/' isAuth={this.state.isAuth} component={Dashboard} />
              <PrivateRoute exact path='/gold' isAuth={this.state.isAuth} component={Gold} />
              <PrivateRoute exact path='/silver' isAuth={this.state.isAuth} component={Silver} />
              <PrivateRoute exact path='/cash' isAuth={this.state.isAuth} component={Cash} />
              <PrivateRoute exact path='/crypto' isAuth={this.state.isAuth} component={Crypto} />
              <PrivateRoute exact path='/my_account' isAuth={this.state.isAuth} component={Account} />
            </Switch>
          </Wrapper>
        </Router>
        <Bottom />
      </MainWrapper>
    )
  }
}

export default App
