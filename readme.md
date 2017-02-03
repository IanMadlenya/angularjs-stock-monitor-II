# What does this app do?
This application doesn't need much of an introduction to those, who actually dabble in and out in the stock markets. But for those who are not into speculative trading and all those risky bets, this is a simulated stock trading application. You can see the price fluctuations as you see in a real time market such as BSE/NSE. And you can buy and sell any of the stocks from the market. You can as well, monitor your cash balance/stocks in portfolio/stock market value etc...
  At the end, all these data are stored into MongoDB as well which we are accessing using python pymongo driver. The frontend uses angular 1.4.

#1. Screenshots
## a. Dashboard that shows your stocks/cash in account
![monitor-your-account](https://cloud.githubusercontent.com/assets/4812767/22501312/46915fe6-e88e-11e6-9367-38a66a3f80b0.png)

## b. Simulated market price fluctuations with ten randomly chosen BSE stocks
![simulated-market](https://cloud.githubusercontent.com/assets/4812767/22501285/2d6f563a-e88e-11e6-939d-e0fc94098a42.png)

## c. Form to buy and sell stocks
![buy-sell-stock](https://cloud.githubusercontent.com/assets/4812767/22501317/4ebb6432-e88e-11e6-84bb-884f740e4d90.png)

#2. Run it locally
## 1. Clone the code
`git clone https://github.com/madhavan020985/stock-monitor`

`cd stock-monitor`

## 2. Setup Mongo database
---- Install Mongodb on your machine

---- Load the data into database

`mongo < ./initdb.js`

## 3. Setup the python server backend
`sudo pip install pymongo` # python driver for mongodb

`sudo pip install bottle`  # http server framework

`python restapi.py`        # run the server at port 3300

## 4. Launch app
Open the url, `http://localhost:3300/index.html#/` and now play with it.