stockTradingApp.controller('marketCtrl',  function($scope, $rootScope, $interval, marketFeedSrvc){
	$scope.marketData = marketFeedSrvc.getMarketData();
});
