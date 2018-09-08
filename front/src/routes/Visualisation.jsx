import React, { Component } from 'react'
import _ from 'lodash'
import {inject, observer} from 'mobx-react'
import { Bar } from 'react-chartjs-2' 
import Maps from '../components/Maps'
import ml1 from '../stores/ez2_results_model_small'
import ml2 from '../stores/ez2_results_model_large'
import ag2 from '../stores/ez2_results_model_large_stateAggregated'
import ag1 from '../stores/ez2_results_model_small_stateAggregated'
import {
    Grid,
    Container,
    Segment,
} from 'semantic-ui-react'

const labelsValues = _.map(ag2,e=>e.State)
const datasml = {
    labels: labelsValues,
    datasets: [
        {
            label: 'Expected Change in Tax Returns Filed',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: _.map(ag1,e=>e.deltaPeople)
        },
    ]
}
const datalrg = {
    labels: labelsValues,
    datasets: [
        {
            label: 'Expected Change in Tax Returns Filed',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: _.map(ag2,e=>e.deltaPeople)
        },
    ]
}
const datasmlPC = {
    labels: labelsValues,
    datasets: [
        {
            label: '% Change in Number of Filed Returns',
            backgroundColor: 'rgba(99,132,255,0.2)',
            borderColor: 'rgba(99,132,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(99,132,255,0.4)',
            hoverBorderColor: 'rgba(99,132,255,1)',
            data: _.map(ag1,e=>e.deltaPeoplePC)
        },
    ]
}
const datalrgPC = {
    labels: labelsValues,
    datasets: [
        {
            label: '% Change in Number of Filed Returns',
            backgroundColor: 'rgba(99,132,255,0.2)',
            borderColor: 'rgba(99,132,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(99,132,255,0.4)',
            hoverBorderColor: 'rgba(99,132,255,1)',
            data: _.map(ag2,e=>e.deltaPeoplePC)
        },
    ]
}

@inject('UIState')
@observer
class Page extends Component {
    render() {
        return (
            <Container fluid  style={{padding:'50px 50px'}}>
                <h1> Machine Learning Analytics</h1>
                <Segment> 
                    <h2>ML Predictor</h2>
                    <p> </p>
                    <Grid columns='equal'>
                        <Grid.Column>
                            <h3>ATO only data</h3>
                            <Container fluid style={{ height:'800px'}}>
                                <Maps data={ml1}/>
                            </Container>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Combined ATO and Census</h3>
                            <Container fluid style={{ height:'800px'}}>
                                <Maps data={ml2}/>
                            </Container>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment style={{height:'100%'}}>
                    <h2>Aggregate Statics</h2>
                    <Grid columns='equal'>
                        <Grid.Column>
                            <Bar
                                data={datasml}
                                width={100}
                                height={500}
                                options={{
                                    maintainAspectRatio: false
                                }} 
                            >
                            </Bar>
                        </Grid.Column>
                        <Grid.Column>
                            <Bar
                                data={datalrg}
                                width={100}
                                height={500}
                                options={{
                                    maintainAspectRatio: false
                                }} 
                            >
                            </Bar>
                        </Grid.Column>
                    </Grid>
                    <Grid columns='equal'>
                        <Grid.Column>
                            <Bar
                                data={datasmlPC}
                                width={100}
                                height={500}
                                options={{
                                    maintainAspectRatio: false
                                }} 
                            >
                            </Bar>
                        </Grid.Column>
                        <Grid.Column>
                            <Bar
                                data={datalrgPC}
                                width={100}
                                height={500}
                                options={{
                                    maintainAspectRatio: false
                                }} 
                            >
                            </Bar>
                        </Grid.Column>
                    </Grid>
                </Segment>

            </Container>
        )
    }
}
export default Page