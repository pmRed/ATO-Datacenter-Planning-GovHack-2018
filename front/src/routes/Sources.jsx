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
                          </List.Description>
                        </List.Content>
                      </List.Item>

                        <List.Item>
                            <List.Icon name='database' size='huge' verticalAlign='middle' />
                            <List.Content>
                              <List.Header as='a'>GovHack ATO 2018 </List.Header>
                              <List.Description>
                                <p>For transparency and repeatability, the raw data that was use is stored in the git repository at `data/ato/atoabsgovhack2018.xlsx`. For convenience, each sheet been extracted into CSV files. We were most interested in this dataset for the correlation between postcode and the total number of people who have lodged a tax return.</p>
                                <a href='https://data.gov.au/dataset/govhackato/resource/f3bcbd38-b3e9-4a27-8729-2314f05a6ae4?inner_span=True'>Link</a>
                              </List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                          <List.Icon name='database' size='huge' verticalAlign='middle' />
                          <List.Content>
                            <List.Header as='a'>Census DataPacks 2016, General Community Profile, Postal Area</List.Header>
                            <List.Description>
                              <p>The Census data provides a correlation between postcode and the total number of people working. The General Community Profile has a lot of data in it, the datasets of interest for us were in G43 and have been saved in `data/census/gcppoa/raw`.</p>
                              <a href='https://datapacks.censusdata.abs.gov.au/datapacks/'>Link</a>
                            </List.Description>
                          </List.Content>
                        </List.Item>

                    </List>
                </Segment>
            </Container>
        )
    }
}
