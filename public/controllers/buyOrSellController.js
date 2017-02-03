stockTradingApp.controller('buyOrSellCtrl',   function($scope, $rootScope, $state, marketFeedSrvc, userHoldingsSrvc){
	$scope.allScrips = marketFeedSrvc.getMarketData();
	$scope.submitOrder = function(order){
		if(order.buyOrSell == "Buy"){
			userHoldingsSrvc.buy(order.quantity, order.scripCode).then(function(resp){
				$scope.order.errorMsg = false;
				userHoldingsSrvc.getCash().then(function(cash){
					$rootScope.cash = cash;
					$state.go('dashboard');
				}, function(){
				});
			}, function(err){
				$scope.order.errorMsg = retStatus.message;
			});

		}else{
			var retStatus = userHoldingsSrvc.sell(order.quantity, order.scripCode).then(function(resp){
				$scope.order.errorMsg = false;
				userHoldingsSrvc.getCash().then(function(cash){
					$rootScope.cash = cash;
					$state.go('dashboard');
				}, function(){
				});
			}, function(err){
				$scope.order.errorMsg = retStatus.message;
			});
		}
		console.log('order placed');
	}
});
