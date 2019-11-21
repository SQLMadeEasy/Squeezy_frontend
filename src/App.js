import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {sendMessage} from './chat'
import './App.css'

export class App extends Component {
  constructor () {
    super () 
      this.state = {
        userInput: ''
      }
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnKeyDown (event) {
    const { sendMessage } = this.props
    if (event.keyCode === 13) {
      sendMessage(event.target.value)
    }

    this.setState({
      userInput: ''
    })
  }

  render() {
    const {feed, sendMessage} = this.props

    return (
      <div>
        <h1>Welcome to Squeezy!</h1>
        <ul>
          {feed.map((entry, idx) => {
            return (
              <Fragment>
              <div key={idx} class="speech-bubble-right">
                <div className='speech-bubble-text-body'>
                  <p><strong>Demo speech bubble</strong></p>
                  <p>{entry.text}</p>
                  {entry.choices.length > 0 ?
                    <ul>
                      {entry.choices.map(choice => <li>{choice}</li>)}
                    </ul>
                    :
                    null
                  }
                  <div class="speech-bubble-right-arrow"></div>
                </div>
              </div>
              <br />  
              </Fragment>
            )
            }           
          )}
        </ul> 
        <div>
          
        </div>
        <form onKeyDown={this.handleOnKeyDown}>
           <input className='userInput' type="text" onChange={this.handleChange}/>
        </form>
    

      </div>
    )
  }
}

const mapStateToProps = state => ({
  feed: state
})

export default connect(mapStateToProps, {sendMessage})(App)
