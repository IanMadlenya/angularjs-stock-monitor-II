var stockTradingApp = angular.module('stockTradingApp', ['ui.router']);

stockTradingApp.run(function($interval, $rootScope, marketFeedSrvc, userHoldingsSrvc){
	//userHoldingsSrvc
	//userHoldingsSrvc.refreshCurrentPrice(marketData);
	$interval(function(){
		marketFeedSrvc.makeOneTickChange();
		$rootScope.$broadcast("priceChanged");
	}, 1000);
});

stockTradingApp.config(function($urlRouterProvider, $stateProvider){
  $urlRouterProvider.otherwise('/')
  $stateProvider
    .state('dashboard', {
      url: '/',
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardCtrl'
    })
		.state('marketData', {
      url: '/market',
      templateUrl: 'views/market.html',
      controller: 'marketCtrl'
    })
		.state('buyOrSell', {
      url: '/buyorsell',
      templateUrl: 'views/buyorsell.html',
      controller: 'buyOrSellCtrl'
    })
});
