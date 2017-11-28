import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationLink.css';

const NavigationLink = ( props ) => (
    <li className='NavigationLink'>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName='active'>{props.children}</NavLink>
    </li>
);

export default NavigationLink;