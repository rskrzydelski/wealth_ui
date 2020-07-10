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
import Register from './components/pages/Register'

const PrivateRoute = ({ component: Component, isAuth }) => (
  <Route render={props => isAuth === true
    ? <Component {...props} />
    : <Redirect to={{ pathname: '/login' }} />}
  />
)

class App extends Component {
  render () {
    const isAuth = false
    return (
      <Router>
        <div className="App">
          <div>
            <NavBar isAuth={isAuth} />
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />

              <PrivateRoute exact path='/' isAuth={isAuth} component={Dashboard} />
              <PrivateRoute exact path='/gold' isAuth={isAuth} component={Gold} />
              <PrivateRoute exact path='/silver' isAuth={isAuth} component={Silver} />
              <PrivateRoute exact path='/cash' isAuth={isAuth} component={Cash} />
            </Switch>
            <Bottom />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
