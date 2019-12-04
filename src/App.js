import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Chat from './components/Chat'
import TableView from './components/TableView'
import Sidebar from './components/Sidebar'
import Chart from './components/Charts'


export default class App extends Component {
  render() {
    return (
      <Fragment>
      <Sidebar/>
        <Router id='page-wrap'>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/chat" component={Chat}></Route>
          <Route path='/chart' component={Chart}></Route>
          <Route path="/table" component={TableView}></Route>
        </Router>
      </Fragment>
    )
  }
}
