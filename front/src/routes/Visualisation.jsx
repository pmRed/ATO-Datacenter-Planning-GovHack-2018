import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import Maps from '../components/Maps'
import {
    Grid,
    Container,
    Segment,
} from 'semantic-ui-react'


@inject('UIState')
@observer
class Page extends Component {
    render() {
        return (
            <Container fluid  style={{padding:'50px 50px'}}>
                <h1> Machine Learning Analytics</h1>
                <Segment>
                    <h2>Aggregate Statics</h2>
                    <Grid columns='equal'>
                        <Grid.Column>
                            <Segment>1</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>2</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>3</Segment>
                        </Grid.Column>
                    </Grid>
                </Segment>

                <Grid columns='equal'>
                    <Grid.Column>
                        <Segment> 
                            <h2>Tax Center Effectiveness By POA</h2>
                            <Container fluid style={{ height:'800px'}}>
                                <Maps/>
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <h2>Individual POA Statistics</h2>
                            {this.props.UIState.regionSelected}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}
export default Page