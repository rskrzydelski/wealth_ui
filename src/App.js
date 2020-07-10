import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import Bottom from './components/Bottom'
import NavBar from './components/NavBar'
import Dashboard from './components/pages/Dashboard'
import Gold from './components/pages/Gold'
import Silver from './components/pages/Silver'
import Cash from './components/pages/Cash'
import Login from './components/pages/Login'
import Logout from './components/pages/Logout'
import Register from './components/pages/Register'
import styled from 'styled-components'

const Grid = styled.div`

`

const Row = styled.div`
  display: flex;
`

const Col = styled.div`
  flex: ${(props) => props.size};
`


const PrivateRoute = ({ component: Component, isAuth }) => (
  <Route render={props => isAuth === true
    ? <Component {...props} />
    : <Redirect to={{ pathname: '/login' }} />}
  />
)

class App extends Component {
  state = {
    isAuth: false
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
      <Router>
        <Row>
        <Col size={1}>
        <div className="App">
          <div>
            <NavBar isAuth={this.state.isAuth} />
            <Switch>
              <Route path='/login' render={ props => (<Login isAuthenticated={this.isAuthenticated} {...props}  /> )} />
              <Route path='/logout' render={ props => (<Logout isAuthenticated={this.isAuthenticated}/> )} />
              <Route path='/register' render={(props) => (<Register {...props}/>)} />

              <PrivateRoute exact path='/' isAuth={this.state.isAuth} component={Dashboard} />
              <PrivateRoute exact path='/gold' isAuth={this.state.isAuth} component={Gold} />
              <PrivateRoute exact path='/silver' isAuth={this.state.isAuth} component={Silver} />
              <PrivateRoute exact path='/cash' isAuth={this.state.isAuth} component={Cash} />
            </Switch>
            <Bottom />
          </div>
        </div>
        </Col>
        </Row>
      </Router>
    )
  }
}

export default App
