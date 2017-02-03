stockTradingApp.controller('dashboardCtrl', function($scope, $rootScope, $interval, marketFeedSrvc, userHoldingsSrvc){
	userHoldingsSrvc.get().then(function(resp){
		$scope.repos = resp;
		userHoldingsSrvc.refreshCurrentPrice($scope.repos);
	}, function(err){
	});
	userHoldingsSrvc.getCash().then(function(cash){
		$scope.cash = cash;
	}, function(){
		$scope.cash = 0;
	});

	$rootScope.$on("pricesChanged", function(){
		console.log("calling userHoldings service from inside dashboard controller");
		userHoldingsSrvc.refreshCurrentPrice($scope.repos);
	});
});
