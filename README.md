# Project Description
This project attempts to find the optimal place to tax help centres.

# Question
_*Find a way to verify if the ATO has optimised the location of Tax Help centres to benefit the intended clients.*_

# Solution
Let's decide on some metrics that are indicative of the outcomes the ATO want to see by adding a new tax centre to a given postal address:
1. Total number of tax returns filed
2. Fraction of tax returns filed

We propose building a model, which, when given postcode level information about
- ATO data
- census data
- a number of tax centers
predicts the aforementioned metrics, ideally with some confidence interval.

Although this model is very flexible, since _any_ input parameter can be varied (of which there are over 400) to predict the metrics, we are particularly interested in how changing the number of tax centers affects the number of tax returns. 

So for each postal code, we fix all variables, except the number of tax centers whch we increment by 1. Then we compare the predicted number of filed tax returns of each postcal code, with the recorded number of tax returns (wthout the extra tax center.

We can then rank the suburbs according to the predictd impact of adding a new tax center.

It is important to note, that this model is *extremely* flexible, and is not at all limited to predicting the effect of tax centers. We could use it to predict changes in taxation due to demographic shifts with respect to age, sex, occupational status, etc.:x


## Model
Given the mix of continuous and discrete types in the census data, and the relatvely small size of the sample set (i.e. number of taxed postcodes), we have used a gradient-boosted forest of regression trees.

We are interested in quantifying the uncertainty of our predictions, and some progress has been made by adapting a quartile regresion procedure. Another alternative model which we considered was deep neural-net trained using Bayes-by-backprop. Using something like a Gaussian prior on each weight/bias variable intrinsially defines a confidence in the value of the parameter which can be propagated to give a confidence interval on the prediction. It is also well-suited to dealing with potentially empty values in the census data (many postcodes we're lacking demographic information, although normalisation  would be necessary to prevent sparsely-populated variables from becoming irrelevant in the model. However, Bayes-by-backprop models are somewhat time-consuming to train, especially if they have to deal with the 400+ combined ABS/ATO variables that we want to use.

To optimise the hyperparameters, we performed a coarse exhaustive grid-search, and then used a bootstrapped gradient boosted regression tree method to further refine our set of hyperparameters with a constrained number of training runs. This generated a substantially better model than naive paramter estimation would have yielded.

## Data Ingestion
To calculate the fraction of tax returns filed, we need to know the total number of people who ought to have filed tax returns in each postcode. The ABS data included in `atoabsgovhack2018.csv` is general population information, and not specifically about the working population.

We can get the working population in each postcode from GCCPOA G43. However, the data is also paramterised with respect to age and sex.

Procedure:
1. Marginalise G43 over age, sex to get working population in each postcode
2. Append ATO data in `atoabsgovhack2018.csv` with the results from (1)


## Possible extensions
The first next step will be to quantity the accuracy of the model. At the moment we attempt to contruct a confidene interval for each prediction by performing quantile regression. To do this, we add random noise to the gradient force additional branches in the regression trees. The procedure is described in https://towardsdatascience.com/regression-prediction-intervals-with-xgboost-428e0a018b. However, we had some difficulty adapting this method to our problem, partially due to the high-dimensionality of the problem and proportionately low number of samples.

To facilitate the efficiency of the learned model, we might try to decorrelate our input (i.e. try and learn high-level features of the census and ATO data). For continuous data, this is relatively straightforwrd (e.g. PCA), however the mixed inputs we have might need more care.

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
https://datapacks.censusdata.abs.gov.au/datapacks/

Raw data in (ignored): data/census/gcppoa/raw

Extracted the data of interest into:

```
data/census/
└── gcppoa
    ├── 2016Census_G43A_AUS_POA.csv
    ├── 2016Census_G43B_AUS_POA.csv
    └── raw
```

# Members

Aqeel Akber <aqeel@thaum.com.au>
Prithvi Reddy <prithvi@thaum.com.au>
Mahasen Sooriyabandara <mahasen@thaum.com.au>
Nic Donaldson <nic.donaldson.0@gmail.com>
