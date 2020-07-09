import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Bottom from './components/Bottom'
import NavBar from './components/NavBar'

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <NavBar isAuth={false} />
          <Bottom />
        </div>
      </div>
    </Router>
  )
}

export default App;
