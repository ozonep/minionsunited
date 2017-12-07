import React, {Component} from "react";
import {doc, users, db, messages} from "../../firebase";
import {observer} from "mobx-react/index";
import {Link} from 'react-router-dom';
import { Grid, Feed, Segment, Message, Button, Form, Container } from 'semantic-ui-react'
import './Chat.css';
// import {MessageBox, SystemMessage, MessageList, Input} from 'react-chat-elements';
import MessageBox from './MessageBox';
// import 'react-chat-elements/dist/main.css';
import Wrapper from "../Wrapper";
const moment = require('moment');


@observer
class Chat extends Component {
    state = {
        msgContent: null
    };
    componentDidMount() {
        messages.query = messages.ref.orderBy('created', 'asc');
        // this.elem.scrollTop = this.elem.scrollHeight
    };
    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.createMsg(e);
        }
    };
    createMsg = e => {
        e.preventDefault();
        let epoc = Date.now();
        let date = new Date(epoc);
        let humanReadable = date.toDateString();
        let targetting = e.target.value;
        return db.collection('messages').add({
            content: this.state.msgContent,
            created: epoc,
            humanDate: humanReadable,
            authorUid: doc.data.uid,
            authorName: doc.data.displayName,
            authorPhoto: doc.data.photoURL,
        }).then(() => {
            targetting = "";
        })
    };
    render() {
        return (
            <Grid centered={true}>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Segment>
                            <p>Users online:</p>
                        <Feed>
                            {users.docs.map((user) => (
                                <Feed.Event key={user.id}>
                                    <Feed.Label image={user.data.photoURL} />
                                    <Feed.Content>
                                        <Feed.Summary content={user.data.displayName} as={Link} to={'/users/'+user.data.nick}/>
                                    </Feed.Content>
                                </Feed.Event>
                            ))}
                        </Feed>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={10} stretched className="crazy">
                        <Segment className="chatcontainer">
                            <Messages uid={this.props.uid}/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Translator/>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Form onSubmit={this.createMsg}>
                            <label>Type your message here:</label>
                            <Form.TextArea autoHeight rows={1} placeholder='e.g.: I want some banana' onKeyPress={this.handleKeyPress} onChange={e => {this.setState({msgContent: e.target.value})}}/>
                            <Form.Button fluid color='blue'>Send</Form.Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

@observer
class Messages extends Component {
    render() {
        return (
            <Wrapper>
                {messages.docs.map((message) => (
                        <MessageBox
                            key={message.id}
                            position={this.props.uid === message.data.authorUid ? 'right':'left'}
                            type={'text'}
                            text={message.data.content}
                            title={message.data.authorName}
                            avatar={message.data.authorPhoto}
                            titleColor={this.props.uid === message.data.authorUid ? 'blue' : 'black'}
                            date={message.data.created}
                            />
                ))}
            </Wrapper>
        )
    }
}



@observer
class Translator extends Component {
    state = {
        translate: null,
        translated: null
    };
    translate = (e) => {
        e.preventDefault();
        let myURL = 'https://api.funtranslations.com/translate/minion.json?text=' + encodeURIComponent(this.state.translate);
        fetch(myURL, {
            method: 'GET',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'X-FunTranslations-Api-Secret': 'M4hxgwmCA9YVqlBHkdWKlQeF'
            },
            // body: JSON.stringify({
            //     text: this.state.translate,
            // })
        }).then(res => res.json())
            .then((data) => {
                return this.setState({
                    translated: data.contents.translated
                })
            });
        // this.setState({
        //     ...this.state,
        //     translated: null
        // });
        // return db.collection('messages').doc('translate').update({
        //     text: this.state.translate
        // })
        // axios.post(url, {
        //     text: this.state.translate,
        // }, config)
        //     .then(function (res) {
        //         return this.setState({
        //             translated: res.data.contents.translated
        //         })
        //     })
        //     .catch(function (err) {
        //         console.log(err);
        //     });
    };
    render() {
        return (
            <Form onSubmit={this.translate}>
                <label>Please use minionese in this chat! Translate from English to minionese here:</label>
                <Form.TextArea autoHeight rows={1} placeholder='English here' onChange={e => {this.setState({translate: e.target.value, translated: null})}}/>
                <Message>{this.state.translated}</Message>
                <Form.Button fluid color='blue'>Check</Form.Button>
            </Form>
        )
    }
}




//
// const FeedExampleSummaryDate = observer(({user}) => (
//     <Feed>
//         {users.docs.map((user) => (
//             <Feed.Event key={user.id}>
//                 <Feed.Label image={user.data.photoURL} />
//                 <Feed.Content>
//                     <Feed.Summary content={user.data.displayName}/>
//                 </Feed.Content>
//             </Feed.Event>
//         ))}
//     </Feed>
// )

export default Chat;