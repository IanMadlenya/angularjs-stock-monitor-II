stockTradingApp.service('userHoldingsSrvc', function($rootScope, $http, $q, marketFeedSrvc){
	
	this.get = function(){
		var deferred = $q.defer();
		$http({
			url: '/api/stocks'
		}).then(function (resp) {
				console.log("the stocks in user account are, ", resp.data);
				deferred.resolve(resp.data);
			}, function(resp) {
				console.log('Error in retrieving user stock,  ', resp);
				deferred.reject(resp);
			});

		return deferred.promise;
	};

	this.getCash = function(){
		var deferred = $q.defer();
		$http({
			url: '/api/cash'
		}).then(function (resp) {
				console.log("the cash in user account is, ", resp.data);
				deferred.resolve(resp.data.cash);
			}, function(resp) {
				console.log('Error in retrieving user cash balance, ', resp);
				deferred.reject(resp);
			});

		return deferred.promise;
	};
	
	this.buy = function(buyQuantity, scripCode){
		var deferred = $q.defer();
		var marketData = marketFeedSrvc.getMarketData();
		console.log("Going to place an order for the scrip - ", scripCode, " and quantity - ", buyQuantity);
		var match = _.find(marketData, function(x){
			return scripCode === x.scripCode;
		});
		
		$http({
			url: '/api/buy',
			method: 'POST',
			data: {
				quantity : buyQuantity,
				scripCode : scripCode,
				scripName : match.scripName,
				marketPrice : match.marketPrice
			}
		}).then(function (resp) {
			console.log("the stock purchase status is , ", resp.data);
			deferred.resolve(resp.data);
		}, function(resp) {
			console.log('stock purchase error response -  ', resp);
			deferred.reject(resp);
		});
		
		return deferred.promise;
	}
	
	this.sell = function(sellQuantity, scripCode){
		var deferred = $q.defer();
		var marketData = marketFeedSrvc.getMarketData();
		var match = _.find(marketData, function(x){
			return scripCode === x.scripCode;
		});
		
		$http({
			url: '/api/sell',
			method: 'POST',
			data: {
				quantity : sellQuantity,
				scripCode : scripCode,
				marketPrice : match.marketPrice
			}
		}).then(function (resp) {
			console.log("the stock purchase status is , ", resp.data);
			deferred.resolve(resp.data);
		}, function(resp) {
			console.log('stock purchase error response -  ', resp);
			deferred.reject(resp);
		});
		
		return deferred.promise;
	};

	var updateCumulativeStats = function(stocksInAcc){
		var cumulativeGain = 0, cumulativeValue = 0;
		for(var i=0; i < stocksInAcc.length; i++){
			var one = stocksInAcc[i];
			one.netGain = one.quantity * (one.marketPrice - one.purchasePrice);
			one.currentMarketVal = one.quantity * one.marketPrice;
			cumulativeGain = cumulativeGain + one.netGain;
			cumulativeValue = cumulativeValue + one.currentMarketVal;
			console.log("calculated cumulativeValue is ", cumulativeValue);
		}
		$rootScope.cumulativeGain = cumulativeGain ;
		$rootScope.shareValue = cumulativeValue ;
		console.log("rootscope values are set as cumulativeGain - ", $rootScope.cumulativeGain, " marketValue - ", $rootScope.shareValue);
	};

	this.refreshCurrentPrice = function(stocksInAcc){
		var marketData = marketFeedSrvc.getMarketData();
		for(var i = 0; i < stocksInAcc.length; i++){
			one = stocksInAcc[i];
			var match = _.find(marketData, function(x){
				return x.scripCode === stocksInAcc[i].scripCode;
			});
			one.marketPrice = match.marketPrice;
			one.priceTrend = match.priceTrend;
			console.log("printing the portfolio stocks after updating with market price..-----------");
			console.log(stocksInAcc);
		}
		//this call is needed to display the profit/loss details in the dashboard page.
		updateCumulativeStats(stocksInAcc);
	}
});
