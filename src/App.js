import React, { Component, Fragment } from 'react'

import {connect} from 'react-redux'
import {sendMessage} from './chat'
import FreeScrollBar from 'react-free-scrollbar'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Row, 
  Jumbotron, 
  Toast,
  ToastBody,
  ToastHeader,
  Navbar,
  NavbarBrand,
} from 'reactstrap'


export class App extends Component {
  constructor() {
    super()
    this.state = {
      userInput: ''
    }
    this.handleInputSubmit = this.handleInputSubmit.bind(this)
  }

  handleInputSubmit(e) {
    const { sendMessage } = this.props

    if (e.keyCode === 13) {
      sendMessage(e.target.value)
      e.target.value = ''
    }

  }

  render() {
    const { feed } = this.props

    return (
      <div>
        <div>
          <Jumbotron className="header">
            <h1>Welcome to Squeezy!</h1>
          </Jumbotron>
          <Navbar color="dark">
            <NavbarBrand href="/" className="Home">Home
              </NavbarBrand>
          </Navbar>
          <p className="tagline">SQL Made Easy For Your Convenience</p>
        </div>

      
      <div>
      <FreeScrollBar style={{width: '100%', height: '280px'}}>        
        <div className="main">
          {feed.map((entry, idx) => {
            return (
              <div>
                <Row key={idx} className="speech-bubble-right">
                  <div className='speech-bubble-text-body'>
                    <p><strong>SqueezyBot</strong></p>
                    <p>{entry.text}</p>
                    {entry.choices.length > 0 ?
                      <ol>
                        {entry.choices.map(choice => <li>{choice}</li>)}
                      </ol>
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
    </FreeScrollBar> 

      </div>
           <input className='user-message-field' type="text" placeholder= "Type Response Here" onKeyDown={this.handleInputSubmit}/>
      </div>
    )
  }
}



const mapStateToProps = state => ({
  feed: state
})


export default connect(mapStateToProps, { sendMessage })(App)
