import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import TableView from './components/TableView'
import Sidebar from './components/Sidebar'


export default class App extends Component {
  render() {
    return (
      <>
      <Sidebar/>
        <Router id='page-wrap'>
          <Route exact path="/" component={Home}></Route>
          <Route path="/table" component={TableView}></Route>
        </Router>
      </>
    )
  }
}
