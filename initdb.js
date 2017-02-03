use stocks;
db.dropDatabase();
use stocks;
db.stocksColln.insert({
	scripCode : "SBIN",
	scripName : "State Bank Of India",
	purchasePrice : 200,
	quantity : 2
});
db.stocksColln.insert({
	scripCode: "BIRLACEMENTS",
	scripName : "Birla Cements",
	purchasePrice: 1000,
	quantity: 2
});
db.statsInfo.insert({
	cash: 10000
});
