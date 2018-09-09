import React, { Component } from 'react'
import {
    List,
    Container,
    Segment,
} from 'semantic-ui-react'


export default class Page extends Component {
    render() {
        return (
            <Container>
                <Segment style={{ padding: '30px 30px' }} vertical>
                    <h1> Data Sources and Discussion</h1>
                    <p>To calculate the fraction of tax returns filed, we need to know the total number of people who ought to have filed tax returns in each postcode. The ABS data included in `atoabsgovhack2018.csv` is general population information, and not specifically about the working population.</p>
                    <p>We can get the working population in each postcode from GCCPOA G43. However, the data is also paramterised with respect to age and sex.</p>
                    <List>
                    </List>

                    <List divided relaxed>

                        <List.Item>
                            <List.Content>
                                <List.Description>
                                    <p>1. Marginalise G43 over age, sex, to get working population in each postcode</p>
                                    <p>2. Append ATO data in `atoabsgovhack2018.csv` with the results from (1)</p>
                                    <p>As postal area approximates postcode, we could perform a join of many datasets seen in `munging/DataMunge.ipynb` trivially. There were only ~400 postcodes where tax help centres were built (or at least labeled). We labeled the raemining postcodes as having no tax centre, this allowed the machine learn from both positive and negative information. We were left with ~2500 rows and ~450 columns, in the analytics that we have presented as Combined ATO and Census we have given all of this information to the machine to learn from. With the analytics labeled ATO only data there are ~40 columns.</p>
                                </List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='database' size='huge' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a' href='https://data.gov.au/dataset/govhackato/resource/f3bcbd38-b3e9-4a27-8729-2314f05a6ae4?inner_span=True'>GovHack ATO 2018 </List.Header>
                                <List.Description>
                                    <p>For transparency and repeatability, the raw data that was use is stored in the git repository at `data/ato/atoabsgovhack2018.xlsx`. For convenience, each sheet been extracted into CSV files. We were most interested in this dataset for the correlation between postcode and the total number of people who have lodged a tax return.</p>
                                </List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='database' size='huge' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a' href='https://datapacks.censusdata.abs.gov.au/datapacks/'>Census DataPacks 2016, General Community Profile, Postal Area</List.Header>
                                <List.Description>
                                    <p>The Census data provides a correlation between postcode and the total number of people working. The General Community Profile has a lot of data in it, the datasets of interest for us were in G43 and have been saved in `data/census/gcppoa/raw`.</p>
                                </List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='database' size='huge' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a' href='https://datapacks.censusdata.abs.gov.au/datapacks/'>Census DataPacks 2016, Postal Area ArcGIS</List.Header>
                                <List.Description>
                                    <p>To correlate postal area (approximates postcode) with GPS boundaries for displaying on a map. This one is directly correlated with the dataset above and was used to verify the results of the API.</p>
                                </List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='database' size='huge' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a' href='https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/POA/MapServer/0'>ABS GeoSpatial API, Postal Area ArcGIS</List.Header>
                                <List.Description>
                                    <p>Provides boundaries on a nice API call. Very handy.</p>
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </Segment>
            </Container>
        )
    }
}
