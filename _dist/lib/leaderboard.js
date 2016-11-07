'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (team, retVal) {
	var jquery = 'http://code.jquery.com/jquery.js';
	var url = 'https://www.nhl.com/' + team;
	var promise = new Promise(function (resolve, reject) {
		_jsdom2.default.env(url, [jquery], function (err, window) {
			var leaders = [],
			    $ = window.$,
			    leaderbord = $('.leaderboard ul .leaderboard__list-item');

			leaderbord.each(function (i, val) {
				var item = $(val);
				var getTextValue = function getTextValue(selector) {
					return item.find(selector).text();
				};

				var leader = {
					avatar: item.find('.player-avatar__img').attr('src'),
					firstName: getTextValue('.leaderboard__player-first-name'),
					lastName: getTextValue('.leaderboard__player-last-name'),
					number: getTextValue('.leaderboard__player-number'),
					position: getTextValue('.leaderboard__player-position'),
					tied: getTextValue('.leaderboard__tie') || false,
					type: getTextValue('.leaderboard__stat-category'),
					stat: getTextValue('.leaderboard__stat-value')
				};

				leaders.push(leader);
			});

			resolve(leaders);
		});
	});

	return promise;
};