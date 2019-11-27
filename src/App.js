import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import TableView from './components/TableView'


export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Route exact path="/" component={Home}></Route>
          <Route path="/table" component={TableView}></Route>
        </Router>
      </>
    )
  }
}
