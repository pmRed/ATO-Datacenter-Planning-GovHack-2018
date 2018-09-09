import React, { Component } from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Image,
    Segment,
} from 'semantic-ui-react'

export default class Page extends Component {
    render() {
        return (
            <Container>
                <Segment style={{ padding: '30px 30px' }} vertical>
                    <h1>Overview</h1>
                    <b>We used machine learning to calculate the predicted impact of adding a new tax center at any particular postcode.</b>

The impact was measured in terms of the number of tax returns filed and the total, which hopefully allows the ATO to identify the best locations for new Tax Help Centers which benefit the most people.

It's important to note that the model we developed is extremely flexible, and is not at all limited to predicting the effect of adding new Tax Help Centers. There are some 400+ input parameters that can be adjusted. We could, for example, use it to predict changes in taxation due to demographic shifts with respect to age, sex, occupational status, etc.

                    <h2 id="preparingdatasets">Preparing datasets</h2>

                    <p>o calculate the fraction of tax returns filed, we need to know the total number of people who ought to have filed tax returns in each postcode. The ABS data included in <code>atoabsgovhack2018.csv</code> is general population information, and not specifically about the working population.</p>

                    <p>We can get the working population in each postcode from GCCPOA G43. However, the data is also paramterised with respect to age and sex.</p>

                    <ol>
                        <li><p>Marginalise G43 over age, sex, to get working population in each postcode</p></li>

                        <li><p>Append ATO data in <code>atoabsgovhack2018.csv</code> with the results from (1)</p></li>
                    </ol>

                    <p>As postal area approximates postcode, we could perform a join of many datasets seen in <code>munging/DataMunge.ipynb</code> trivially. There were only ~400 postcodes where tax help centres were built (or at least labeled). We labeled the remaining postcodes as having no tax centre, this allowed the machine to learn from both positive and negative information. We were left with ~2500 rows and ~450 columns, in the analytics that we have presented as Combined ATO and Census we have given all of this information to the machine to learn from. With the analytics labeled ATO only data there are ~40 columns.</p>

                    <h2 id="buildingmodels">Building Models</h2>

                    <p>Given the mix of continuous and discrete types in the data, and the relatively small size of the sample set (i.e. number of taxed postcodes), we have used a gradient-boosted regression tree (GBRT) method. We have employed the DART tree booster (described in Rashmi Korlakai Vinayak, Ran Gilad-Bachrach. “DART: Dropouts meet Multiple Additive Regression Trees.” JMLR.) which adapts dropout regularisation from deep learning to boosted trees, ameliorating the tendency of these models to overfit their training data. The model hyperparameters were optimised using a hybrid coarse grid-search and meta GBRT optimiser</p>

                    <p>We trained models using a subset of the ATO data only, and another model which used the combined ATO/ABS data. We found that the ATO data was overly optimistic about the impact of a new Tax Help Center; whereas the model trained on the ATO/ABS data was somewhat pessimistic. We included interactive graphs of both models for comparison.</p>

                </Segment>
            </Container>
        )
    }
}
