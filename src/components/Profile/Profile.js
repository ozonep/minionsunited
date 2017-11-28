import React, {Component} from 'react';
import {observer} from 'mobx-react';
import firebase from "firebase";
// import {Document} from "firestorter";
import {storage, db, doc, users, posts} from '../../firebase';
import FileInput from '../FileInput';
import {Card, Icon, Image, Button, Grid, Container, Item, Feed} from 'semantic-ui-react'
import Files from 'react-files';
import CreateNewPost from '../CreateNewPost/CreateNewPost';
import './Profile.css';
// import ItemExampleLink from '../Post/Post';


@observer
class Profile extends Component {
    componentDidMount() {
        posts.query = posts.ref.where('authorUid', '==', doc.data.uid).orderBy('created', 'desc').limit(50);
    };

    render() {
        return (
            <Grid columns={2} centered={true}>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <CardExampleCard/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <CreateNewPost/>
                        <Posts/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

@observer
class Posts extends Component {
    render() {
        return (
            <Container fluid textAlign='center' className='segment'>
                <Feed>
                    {posts.docs.map((post) => (
                        <ItemExampleLink
                            key={post.id}
                            post={post}/>
                    ))}
                </Feed>
            </Container>
        )
    }
}

const ItemExampleLink = observer(({post}) => {
    const {authorPhoto, authorName, content, humanDate, likes} = post.data;
    return (
        <Feed.Event>
            <Feed.Label image={authorPhoto} style={{marginTop: '9px'}}/>
            <Feed.Content>
                <Feed.Summary>
                    <a>{authorName}</a>
                    <Feed.Date>{humanDate}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                    {content}
                </Feed.Extra>
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like'/>
                        {likes} Likes
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    )
});



// {this.state.uploadProgress ? <p>{"Upload is " +this.state.uploadProgress+ "% completed"}</p> : null}

@observer
class CardExampleCard extends Component {
    state = {
        uploadProgress: null
    };
    handleFileUpload = (files) => {
        const file = files[0];
        let storageRef = firebase.storage().ref();
        let mountainsRef = storageRef.child('mountains.jpg');
        const uploadTask = storageRef.child(doc.data.nick + '/' + file.name).put(file, {contentType: file.type});
        uploadTask.on('state_changed', (snapshot) => {
                const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(uploadProgress);
                this.setState({uploadProgress});
            }, function (error) {
                console.log("Me error", error)
            }, function () {
                let downloadURL = uploadTask.snapshot.downloadURL;
                this.setState({uploadProgress: null});
                return doc.update({photoURL: downloadURL})
            }.bind(this)
        )
    };

    render() {
        return (
            <Card>
                <Image src={doc.data.photoURL} alt={doc.data.displayName}/>
                <Card.Content>
                    <Card.Header textAlign={'center'}>
                        {doc.data.displayName}
                    </Card.Header>
                    <Card.Description textAlign={'center'}>
                        {doc.data.status}
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <div className="files">
                        <Files
                            className='files-dropzone'
                            onChange={this.handleFileUpload}
                            accepts={['image/png', 'image/jpeg', 'image/gif']}
                            multiple
                            maxFiles={3}
                            maxFileSize={10000000}
                            minFileSize={0}
                            clickable
                        >
                            Drop image here to change profile pic, or just click me
                            <p>{this.state.uploadProgress ? <p>{"Upload is " + Math.round(this.state.uploadProgress) + "% completed"}</p> : null}</p>
                        </Files>
                    </div>
                </Card.Content>
            </Card>
        )
    }

}

export default Profile;
