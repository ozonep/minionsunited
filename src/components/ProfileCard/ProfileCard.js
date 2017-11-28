import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import {observer} from 'mobx-react';


export const CardExampleCard = observer(({user}) => {
    const {photoURL, displayName, status} = user.data;
    return (
        <Card raised>
            <Image src={photoURL}/>
            <Card.Content textAlign="center">
                <Card.Header>
                    {displayName}
                </Card.Header>
                <Card.Description>
                    {status}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='circle' color="green"/>
                    Online now
                </a>
            </Card.Content>
        </Card>
    )
});

