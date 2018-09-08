import React, { Component } from 'react'
import {
    List,
    Container,
} from 'semantic-ui-react'


export default class Page extends Component {
    render() {
        return (
            <Container fluid style={{padding:'50px 50px'}}>
                <List divided relaxed>
                    <List.Item>
                        <List.Icon name='database' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>Data Resource 1</List.Header>
                            <List.Description>Description Long</List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            </Container>
        )
    }
}
