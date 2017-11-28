import {posts, users} from "../../firebase";
import React, {Component} from "react";
import {observer} from "mobx-react/index";
import { Segment, Container, Feed, Grid, Card } from 'semantic-ui-react';
import {CardExampleCard} from '../ProfileCard/ProfileCard';


@observer
class People extends Component {
    render() {
        const userList = users.docs.map((user) => (
            <CardExampleCard
                key={user.id}
                user={user}/>
        ));
        return (
            <Grid centered columns={1}>
                <Grid.Column width={13}>
                <Card.Group itemsPerRow={5}>
                    {userList}
                </Card.Group>
                </Grid.Column>
            </Grid>
        )
    }
}


const SegmentExampleCompact = () => (
    <Segment compact>
        Compact content.
    </Segment>
);

export default People;
        //
        // <Container fluid textAlign='center' className='segment'>
        //     {users.docs.map((user) => (
        //         <CardExampleCard
        //             key={user.id}
        //             user={user}/>
        //     ))}
        // </Container>