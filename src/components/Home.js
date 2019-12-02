import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText  } from 'reactstrap';
import { saveCredentials } from '../credentials';


const Home = (props) => {
    const [modal, setModal] = useState(false);
    const [databaseUser, setDatabaseUser] = useState("")
    const [databaseName, setDatabaseName] = useState("")
    const [databasePassword, setDatabasePassword] = useState("")
    const [databaseHostname, setDatabaseHostname] = useState("")
    const [databasePort, setDatabasePort] = useState("")


    const toggle = () => setModal(!modal);

    function connectDb() {
        props.history.push('/chat')
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(databaseUser)
        saveCredentials({databaseUser, databaseName, databasePassword, databaseHostname, databasePort})
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
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="databaseUser">Database Username</Label>
                                    <Input type="text" name="databaseUser" value={databaseUser} onChange={e => setDatabaseUser(e.target.value)} id="databaseUser" placeholder="my database username" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="databaseName">Database Name</Label>
                                    <Input type="text" name="databaseName" value={databaseName} onChange={e => setDatabaseName(e.target.value)} id="databaseName" placeholder="my_database" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="databasePassword">Database Password</Label>
                                    <Input type="password" name="password" value={databasePassword} onChange={e => setDatabasePassword(e.target.value)} id="databasePassword" placeholder="my password" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="databaseHostname">Hostname</Label>
                                    <Input type="text" name="databaseHosename" value={databaseHostname} onChange={e => setDatabaseHostname(e.target.value)} id="databaseHostname" placeholder="my hostname" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="databasePort">Port</Label>
                                    <Input type="text" name="databasePort" value={databasePort} onChange={e => setDatabasePort(e.target.value)} id="databasePort" placeholder="my port" />
                                </FormGroup>
                                <Button>Submit</Button>
                            </Form>
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

const mapDispatchToProps = dispatch => ({
    saveCredentials: (credentials) => dispatch(saveCredentials(credentials))
})

const mapStateToProps = state => ({
    credentials: state.credentials
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Home))