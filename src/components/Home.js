import React from 'react'
import {Button} from 'reactstrap'
import {withRouter} from 'react-router-dom'

class Home extends React.Component {
    constructor() {
        super()
        this.connectDb = this.connectDb.bind(this)
    }
    connectDb() {
        this.props.history.push('/chat')
    }
    render() {
        return (
            <div className = 'home-body'>
                <div className='app-welcome-content'>
                    <h1 className='app-header'>Welcome to Squeezy</h1>
                    <h3 className='app-subheader'>SQL Made Easy</h3>
                    <Button onClick = {this.connectDb}>Connect Your Database</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(Home)