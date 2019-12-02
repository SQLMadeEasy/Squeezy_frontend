import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const Home = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    function connectDb() {
        props.history.push('/chat')
    }

        return (
            <div className = 'home-body'>
                <div className='app-welcome-content'>
                    <h1 className='app-header'>Welcome to Squeezy</h1>
                    <h3 className='app-subheader'>SQL Made Easy</h3>
                    <Button onClick = {toggle}>Connect Your Database</Button>
                    <Modal isOpen={modal} toggle={toggle} className='connect-db-modal'>
                        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={connectDb}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
}

export default withRouter(Home)