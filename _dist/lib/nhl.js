'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _leaderboard = require('./leaderboard');

var _leaderboard2 = _interopRequireDefault(_leaderboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = _redis2.default.createClient();

exports.default = function (team, ignoreCache) {
	var promise = new Promise(function (resolve, reject) {
		var cacheKey = team;
		cache.get(cacheKey, function (err, cachedValue) {

			if (cachedValue && !ignoreCache) {
				resolve(JSON.parse(cachedValue));
			} else {
				(0, _leaderboard2.default)(team).then(function (players) {
					cache.set(cacheKey, JSON.stringify(players));
					cache.expire(cacheKey, 30);

					resolve(players);
				});
			}
		});
	});
	return promise;
};