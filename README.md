# Project Description
This project attempts to find the optimal place to tax help centres.

# Question
_*Find a way to verify if the ATO has optimised the location of Tax Help centres to benefit the intended clients.*_

# Solution
Let's decide on some metrics that are indicative of the outcomes the ATO want to see by adding more tax centres.
1. Total number of tax returns filed
2. Fraction of tax returns filed

We propose building a model, which, when given
- a postcode
- census data
- a number of tax centers
predicts the aforementioned metrics, _ideally with some confidence interval_.
We want to then build a ranking of postcodes which shows the marginal gain, with respect to the aformentioned metrics, of building a new tax center in that postcode. If we have a confidence interval for the metrics, we should do something sensible, like ranking by the lower bound of the Wilson interval or by $x-2\sigma_x$.

Given the mix of continuous and discrete types in the census data, and the relatvely small size of the sample set (i.e. number of taxed postcodes), we should use a random forest approach (e.g. xgboost). Not sure how this can generate a confidence intervals. We could use a neural-net and apply Bayes-by-backprop to generate confidence intervals on predictions, however, not sure how well a Bayesian estimator for NN parameters works with discrete variables.

## Data Ingestion
To calculate the fraction of tax returns filed, we need to know the total number of people who ought to have filed tax returns in each postcode. The ABS data included in `atoabsgovhack2018.csv` is general population information, and not specifically about the working population.

We can get the working population in each postcode from GCCPOA G43. However, the data is also paramterised with respect to age and sex.

Procedure:
1. Marginalise G43 over age, sex to get working population in each postcode
2. Append ATO data in `atoabsgovhack2018.csv` with the results from (1)


## Possible extensions
To facilitate the efficiency of the learned model, we might try to decorrelate our inputs. For continuous data, this is relatively straightforwrd (e.g. PCA), however the mixed inputs we have might need more care.

# Asumptions
Assuming that the "total number of people working" is equal to the total number of people who ought to have lodged a tax return.

# Data sets

## GovHack ATO 2018: Postcode, Total number of people lodged tax return
https://data.gov.au/dataset/govhackato/resource/f3bcbd38-b3e9-4a27-8729-2314f05a6ae4?inner_span=True
Raw data in: data/ato/atoabsgovhack2018.xlsx
Extracted each sheet such that:

```
data/
└── ato
    ├── atoabsgovhack2018_abs.csv
    ├── atoabsgovhack2018_absseifa.csv
    ├── atoabsgovhack2018_ato.csv
    ├── atoabsgovhack2018_helpcentre.csv
    └── atoabsgovhack2018.xlsx
```

## Census DataPacks: Postcode, Total number of people working.

# Members

Aqeel Akber <aqeel@thaum.com.au>
Prithvi Reddy <prithvi@thaum.com.au>
Mahasen Sooriyabandara <mahasen@thaum.com.au>
Nic Donaldson <nic.donaldson.0@gmail.com>
