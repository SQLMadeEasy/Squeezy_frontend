import React, { Component } from 'react'
import {connect} from 'react-redux'
import {sendMessage} from './chat'

export class App extends Component {
  render() {
    const {feed, sendMessage} = this.props

    return (
      <div>
        <h1>Welcome to SQueezy!</h1>
        <ul>
          {feed.map((entry, idx) => 
            <li key={entry.idx}> 
            {entry.text}
            <ul>
               {entry.choices.map(choice => <li>{choice}</li> )}
            </ul>               
           </li>
          )}
        </ul> 
        <div>
          
        </div>
        <input type="text" onKeyDown={ (e) => e.keyCode === 13 ? sendMessage(e.target.value) : null}/>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  feed: state
})

export default connect(mapStateToProps, {sendMessage})(App)
