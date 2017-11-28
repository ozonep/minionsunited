import React, { Component } from 'react';
import { Form, Container, Icon } from 'semantic-ui-react';
import {storage, db, doc, users} from '../../firebase';
import {observer} from 'mobx-react';

@observer
class CreateNewPost extends Component {
    state = {
        content: null
    };
    // handleChange = (e, { value }) => this.setState({ value });
    createPost = e => {
        e.preventDefault();
        let epoc = Date.now();
        let date = new Date(epoc);
        let humanReadable = date.toDateString();
        return db.collection('posts').add({
            content: this.state.content,
            created: epoc,
            humanDate: humanReadable,
            comments: 0,
            authorUid: doc.data.uid,
            authorName: doc.data.displayName,
            authorPhoto: doc.data.photoURL,
        })
    };
    render() {
        return (
            <Container fluid textAlign='center' className='segment'>
                <span className='global__color-lightGrey'>What's new with you?</span>
                <Icon name='write' color='grey' size='large' circular style={{marginLeft: '5px', marginBottom: '5px'}}/>
                <Form onSubmit={this.createPost}>
                    <Form.TextArea autoHeight placeholder='e.g.: I think my new Stress Management plan is going to be alcoholism.' onChange={e => {this.setState({content: e.target.value})}}/>
                    <Form.Button>Send</Form.Button>
                </Form>
            </Container>
        )
    }
}

export default CreateNewPost;
