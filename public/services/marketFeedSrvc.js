stockTradingApp.service('marketFeedSrvc', function($rootScope){

	var allScrips = [{
		scripCode: "SBIN",
		scripName: "State Bank Of India",
		marketPrice: 200
	},{
		scripCode: "BIRLACEMENTS",
		scripName: "Aditya Birla Cements",
		marketPrice: 500
	}, {
		scripCode: "GRAPHITEIND",
		scripName: "MonoCarbon acetylene",
		marketPrice: 50,
	},{
		scripCode: "ICICI",
		scripName: "Chanda Kochar runs me",
		marketPrice: 210
	},{
		scripCode: "TTKPrestige",
		scripName: "Prestige Kitchen appliances",
		marketPrice: 4000
	}, {
		scripCode: "RENUSUGARS",
		scripName: "Renuka Sugars",
		marketPrice: 500
	},{
		scripCode: "ENGLISHEAST",
		scripName: "East India Company",
		marketPrice: 1200
	},{
		scripCode: "TATAMOTORS",
		scripName: "Jaguar manufactures",
		marketPrice: 2100
	},{
		scripCode: "UNITEDBREW",
		scripName: "Wine At Sula",
		marketPrice: 209
	}, {
		scripCode: "JSCHAN",
		scripName: "Javascript community",
		marketPrice: 5000
	}];
	
	this.getMarketData = function(){
		return allScrips;
	};

	this.makeOneTickChange = function(){
		for(var i = 0; i< allScrips.length; i++){
			var one = allScrips[i];
			var priceMoves = ["down", "noChange", "up"];
			var rand = priceMoves[Math.floor(Math.random() * priceMoves.length)];
			if(rand == "down"){
				//the scrip's market price  has come down by 1%.. this is a random event simulation
				one.marketPrice = one.marketPrice *0.99;
				one.priceTrend = "red";
			}else if(rand == "up"){
				one.marketPrice = one.marketPrice *1.01;
				one.priceTrend = "green";
			}else{
				one.priceTrend = undefined;
			}
		}
		$rootScope.$broadcast("pricesChanged", allScrips);
	}

	
});
