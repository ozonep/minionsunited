import React, {Component} from 'react';
import {Route, NavLink} from 'react-router-dom';
import Register from '../Register';
import Login from '../Login';
import './Welcome.css';
import {Menu, Segment} from 'semantic-ui-react'


class Welcome extends Component {
    state = {activeItem: 'login'};
    handleItemClick = (e, {name}) => this.setState({activeItem: name});
    render() {
        return (
                <div className='welcomeContainer'>
                    <h1 className="welcomeMinion">minions united</h1>
                    <MainLogo class="bigMainLogo"/>
                    <WelcomeLogo/>
                    <div className="logregContainer">
                        <Menu attached='top' tabular>
                            <Menu.Item name='login' onClick={this.handleItemClick}
                                       as={NavLink} to='/welcome' exact/>
                            <Menu.Item name='register'
                                       onClick={this.handleItemClick} as={NavLink} to='/welcome/register'/>
                        </Menu>
                        <Segment attached='bottom'>
                            <Route exact path='/welcome' component={Login}/>
                            <Route path='/welcome/register' component={Register}/>
                        </Segment>
                    </div>
                </div>
        )
    }
}

const WelcomeLogo = () => (
    <img className='logo' src='https://s3.amazonaws.com/ozonepsocialnetwork/minionswelc.png'/>
);

const MainLogo = (props) => (
    <img className={props.class} src='https://s3.amazonaws.com/ozonepsocialnetwork/cornerwelc.png'/>
);

export default Welcome;