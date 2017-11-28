import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import {auth, db, googleAuthProvider, regUser} from '../firebase';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';

export default class Register extends Component {
    state = {
        registerError: null,
        email: '',
        password: ''
    };
    handleSubmit = e => {
        e.preventDefault();
        regUser(this.state.email, this.state.password).catch(e => this.setState({registerError: e.message}));
    };
    render() {
        return (
            <div className="registration">
                <Header as='h2' color='black' textAlign='center'>First time user? Sign up!</Header>
                <Form size='large' onSubmit={this.handleSubmit}>
                    <Segment>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={event => this.setState({ email: event.target.value })}/>
                        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Your Password (min. 6 characters)' type='password' onChange={event => this.setState({ password: event.target.value })}/>
                        {this.state.registerError && (
                            <Message negative>
                                <Message.Header>Error!</Message.Header>
                                <p>{this.state.registerError}</p>
                            </Message>
                        )}
                        <Button color='blue' fluid size='large'>Register</Button>
                    </Segment>
                </Form>
            </div>
        );
    }
}
