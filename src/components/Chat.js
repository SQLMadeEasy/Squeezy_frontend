import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { sendMessage, setUpInitialState } from '../chat'
import { loadData, loadAllData } from '../data'
import FreeScrollBar from 'react-free-scrollbar'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Row,
  Toast,
  ToastBody,
  ToastHeader,
  InputGroup,
} from 'reactstrap'
import Sidebar from './Sidebar'
import { getTables } from "../dummydata";




class Chat extends Component {
  constructor() {
    super()
    this.state = {
      userInput: '',
    }
    this.handleInputSubmit = this.handleInputSubmit.bind(this)
    this.loadAndChangePage = this.loadAndChangePage.bind(this)

  }

  handleInputSubmit(e) {
    const { sendMessage } = this.props

    if (e.keyCode === 13) {
      sendMessage(e.target.value)
      e.target.value = ''
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
 

  async componentDidMount() {
    const response = await getTables();
    this.props.setUpInitialState(response.data);
    
  }

  componentDidUpdate() {
    if (this.props.feed.length > 1) {
      this.scrollToBottom();
    }
  }

  loadAndChangePage(query) {
    const {databaseName, databaseHostname, databasePassword, databaseUser, databasePort} = this.props.credentials 
    this.props.loadData(query, 
      databaseName,
      databaseHostname,
      databaseUser,
      databasePort,
      databasePassword)
    this.props.history.push('/table')
  }

  render() {
    const { feed } = this.props

    return (
      <div>
        <header className="chat-header">
            <h1>Welcome to Squeezy!</h1>
          {/* <Navbar color="dark">
            <NavbarBrand href="/" className="Chat">Chat
              </NavbarBrand>
          </Navbar> */}
        </header>


        <div className='chat-body'>
          <FreeScrollBar className="FreeScrollbar" style={{ width: '100%', height: '310px' }}>
              {feed.map((entry, idx) => {
                return (
                  <Toast className="speech-bubble-right">
                    {/* <ToastHeader>
                      <p><strong>{entry.speaker}</strong></p>
                    </ToastHeader> */}
                    <ToastBody>
                      <div>
                        <Row key={idx}>
                          <div className='speech-bubble-text-body'>
                            {entry.text.includes('SELECT') ? this.loadAndChangePage(entry.text) : <p>{entry.text}</p>}
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
                    </ToastBody>
                  </Toast>
                )
              }
              )}
              <div style={{ float: "left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
              </div>
          </FreeScrollBar>
        </div>
        <InputGroup className = 'user-message-field-container'>
          <input className='user-message-field' type="text" placeholder="Type Response Here" onKeyDown={this.handleInputSubmit} />
        </InputGroup>
        {/* <>
        <TableView feed={this.props.feed} data={this.props.data}></TableView>
        </> */}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setUpInitialState: (tables) => dispatch(setUpInitialState(tables)),
  sendMessage: (text) => dispatch(sendMessage(text)),
  loadData: (query) => dispatch(loadData(query)),
  loadAllData: (table) => dispatch(loadData(table))
})

const mapStateToProps = state => ({
  feed: state.chat,
  data: state.data,
  credentials: state.credentials,
})


export default connect(mapStateToProps, mapDispatchToProps)(Chat)
