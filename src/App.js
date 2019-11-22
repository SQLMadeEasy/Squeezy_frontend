import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {sendMessage} from './chat'
import './App.css'
import { Row } from 'reactstrap'

export class App extends Component {

  render() {
    const {feed, sendMessage} = this.props

    function bottom() {
      document.getElementsByClassName( 'user-message-field' )[0].scrollIntoView();
    };

    return (
      <div>
        <h1>Welcome to Squeezy!</h1>
        <div className="main">
          {feed.map((entry, idx) => {
            return (
              <div>
              <Row key={idx} className="speech-bubble-right">
                <div className='speech-bubble-text-body'>
                  <p><strong>Demo Speech Bubble</strong></p>
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
              </Row>
              <br />  
              </div>
            )
            }           
          )}
        </div> 
        <div>
          
        </div>
           <input className='user-message-field' type="text" placeholder= "Type Response Here" onKeyDown={(e) => {
             if (e.keyCode === 13) {
               sendMessage(e.target.value)
               e.target.value = ''
               document.getElementsByClassName( 'speech-bubble-right' )[0].scrollIntoView();
             }
           }}
           />
      </div>
    )
  }
}




const mapStateToProps = state => ({
  feed: state
})

export default connect(mapStateToProps, {sendMessage})(App)
