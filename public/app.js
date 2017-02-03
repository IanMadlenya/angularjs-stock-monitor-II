var stockTradingApp = angular.module('stockTradingApp', ['ui.router']);

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
