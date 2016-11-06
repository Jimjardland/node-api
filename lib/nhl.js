var redis = require('redis');
var leaderboard = require('./leaderboard');
var cache = redis.createClient();

exports.stats = function (team, ignoreCache, retVal) {
	var cacheKey = team;

	cache.get(cacheKey, function (err, cachedValue){
		if(cachedValue && !ignoreCache) {
			retVal(JSON.parse(cachedValue))
		} else {
			leaderboard.players(team, function (players) {
				var d = new Date();
				var todayEnd = new Date().setSeconds(d.getSeconds() + 30);
				cache.set(cacheKey, JSON.stringify(players))
				cache.expire(cacheKey, 30);

				retVal(players);
			});
		}
	});
}