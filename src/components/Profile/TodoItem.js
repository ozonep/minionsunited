import React, { Component } from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';


class TodoItem extends Component {
    static propTypes = {
        todo: PropTypes.any
    };
    render() {
        const {use} = this.props;
        console.log(use);
        const {displayName, email} = use.data;

        console.log('TodoItem.render: ', use.path, ', text: ', email);
        return (
            <div>
                <p>My name is: {displayName}</p>
                <p>My Email is {email}</p>
            </div>
        );
    }
}

export default observer(TodoItem);