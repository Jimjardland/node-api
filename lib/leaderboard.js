var jsdom = require('jsdom');
var jquery = 'http://code.jquery.com/jquery.js';

exports.players = function (team, retVal) {
	var url = 'https://www.nhl.com/' + team;

	jsdom.env(url, [jquery],  
		function (err, window) {
			var leaders = [],
			$ = window.$,
			leaderbord = $('.leaderboard ul .leaderboard__list-item');

			leaderbord.each(function (i, val) {
			 	var item = $(val);

			 	var getTextValue = function (selector) {
			 		return item.find(selector).text();
			 	}

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

			retVal(leaders);
  		});
};