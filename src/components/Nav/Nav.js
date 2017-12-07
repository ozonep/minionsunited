import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom'
import { auth, users, doc, db } from '../../firebase';
import {Document} from 'firestorter';
import {observer} from 'mobx-react';
import './Nav.css';
import NavigationLink from '../NavigationLink/NavigationLink';
import firebase from 'firebase';
import { Input, Menu } from 'semantic-ui-react';


@observer
export default class NavBar extends Component {
    state = {
        activeItem: 'home'
    };
    componentWillMount() {
        console.log(this.props.uid);
        doc.ref = db.doc('users/' + this.props.uid);
    };
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    render() {
        const { activeItem } = this.state;
        return (
            <Menu>
                <Menu.Item name='Home' icon='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={NavLink} to='/feed'/>
                <Menu.Item name='Users' icon='users' active={activeItem === 'messages'} onClick={this.handleItemClick} as={NavLink} to='/users'/>
                <Menu.Item name='Profile' icon='user' active={activeItem === 'friends'} onClick={this.handleItemClick} as={NavLink} to={'/profile'} />
                <Menu.Item name='Chat' icon='comments' active={activeItem === 'chat'} onClick={this.handleItemClick} as={NavLink} to={'/chat'} />
                <Menu.Header as='h2' className="menuHeader">minions united</Menu.Header>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item>
                        <p>{doc.data.displayName}</p>
                    </Menu.Item>
                    <Menu.Item>
                        <img src={doc.data.photoURL}/>
                    </Menu.Item>
                    <Menu.Item>
                        <input type="button" value="Logout" className="logoutbtn" onClick={() => auth.signOut()}/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}





const ProfilePic = (props) => {
    return (
        <img className={props.class} src={props.src}/>
    )
};

const LogoutButton = () => {
    return (
        <pre>
            <input type="button" value="Logout" className="logoutbtn" onClick={() => auth.signOut()}/>
        </pre>
    )
};

const MainLogo = (props) => (
    <img className={props.class} src='https://s3.amazonaws.com/ozonepsocialnetwork/head_mini.png'/>
);





