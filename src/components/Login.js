import React, { Component } from 'react';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import {auth, googleAuthProvider, login, resetPassword} from '../firebase';
import {GoogleLoginButton} from 'react-social-login-buttons';



export default class Login extends Component {
    state = {
        email: '',
        password: '',
        loginMessage: null
    };
    handleSubmit = e => {
        e.preventDefault();
        login(this.state.email, this.state.password)
            .then(() => {this.props.history.redirect('/feed')})
            .catch(() => {
                this.setState({
                    loginMessage: 'Invalid username/password!'
                });
            });
    };
    resetPass = () => {
        resetPassword(this.state.email)
            .then(() => this.setState({loginMessage: `Password reset email sent to ${this.state.email}`}))
            .catch(() => this.setState({loginMessage: `Email address not found.`}));
    };
    render() {
        return (
            <div className="login">
                <Header as='h2' color='black' textAlign='center'>Please log-in to continue</Header>
                <Form size='large' onSubmit={this.handleSubmit}>
                    <Segment>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Enter your E-mail address' onChange={event => this.setState({ email: event.target.value })}/>
                        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Enter your Password' type='password' onChange={event => this.setState({ password: event.target.value })}/>
                        {this.state.loginMessage && (
                                <Message negative>
                                    <Message.Header>Error! {this.state.loginMessage}</Message.Header>
                                    <p>Forgot your password? <a href='#' onClick={this.resetPass}>Reset password</a></p>
                                </Message>
                        )}
                        <Button color='blue' fluid size='large'>Login</Button>
                        <GoogleLoginButton style={{marginLeft: 0, marginRight: 0, marginTop: 10}} onClick={() => auth.signInWithPopup(googleAuthProvider)}/>
                    </Segment>
                </Form>

            </div>
        );
    }
}

