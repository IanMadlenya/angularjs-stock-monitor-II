# What does this app do?
This application doesn't need much of an introduction to those, who actually dabble in and out in the stock markets. But for those who are not into speculative trading and all those risky bets, this is a simulated stock trading application. You can see the price fluctuations as you see in a real time market such as BSE/NSE. And you can buy and sell any of the stocks from the market. You can as well, monitor your cash balance/stocks in portfolio/stock market value etc...
  At the end, all these data are stored into MongoDB as well which we are accessing using python pymongo driver. The frontend uses angular 1.4.

#00. Screenshots
## a. Dashboard that shows your stocks/cash in account
![monitor-your-account](https://cloud.githubusercontent.com/assets/4812767/22501312/46915fe6-e88e-11e6-9367-38a66a3f80b0.png)

## b. Simulated market price fluctuations with ten randomly chosen BSE stocks
![simulated-market](https://cloud.githubusercontent.com/assets/4812767/22501285/2d6f563a-e88e-11e6-939d-e0fc94098a42.png)

## c. Form to buy and sell stocks
![buy-sell-stock](https://cloud.githubusercontent.com/assets/4812767/22501317/4ebb6432-e88e-11e6-84bb-884f740e4d90.png)

# 0. Install/Load the database, Install python libraries, Clone the code  
--After installing mongodb on your machine using the command, `sudo apt-get -y install mongodb`, open mongo shell and load the database,  
`mongo < ./initdb.js`  
--Verify the collections statsInfo (that contains the users' cash balance)and stocksColln (that contains the stocks in user's account) contain documents using the command,  
`db.statsInfo.find({}, {'_id': 0})`  
`db.stocksColln.find({}, {'_id': 0})`  
--Install python libraries for bottle server and mongo driver  
`sudo pip install pymongo`  
`sudo pip install bottle`  
`git clone https://github.com/madhavan020985/angularjs-stock-monitor`  
`cd angularjs-stock-monitor`  
`git checkout 0-from-the-scratch`  
open `http://localhost:3300/index.html`  
A simple app must be up and running  
# 1. Setup the backend for stock trading app using bottle endpoints
There are three screens featured in the application. One screen will show all stocks traded actively in the market with their fluctuating market prices. Second screen will contain a form that allows the user to buy/sell any of the traded stocks. Third screen will contain the user's cash balance, total asset value, stocks lying in his DEMAT account
For this, we need the following endpoints.
* /api/stocks  -- to get all the stock information
* /api/cash    -- to get the user's cash balance
* /api/sell    -- sell 'n' shares of a stock at the market price
* /api/buy     -- buy 'n' shares of a stock at the market price


