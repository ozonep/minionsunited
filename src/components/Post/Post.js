import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'


const ItemExampleLink = observer(({post}) => {
    const {photoURL, authorName, content} = post.data;
    return (
    <Feed.Event>
        <Feed.Label image={photoURL} />
        <Feed.Content>
            <Feed.Summary>
                <a>{authorName}</a>
                <Feed.Date>3 days ago</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
                {content}
            </Feed.Extra>
            <Feed.Meta>
                <Feed.Like>
                    <Icon name='like' />
                    5 Likes
                </Feed.Like>
            </Feed.Meta>
        </Feed.Content>
    </Feed.Event>
    )
});

export default ItemExampleLink

const TodoItem = observer(({doc}) => {
    return <div>
        <input type='checkbox' checked={finished} />
        <input type='text' value={text} />
    </div>;
});
