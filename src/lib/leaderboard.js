import jsdom from 'jsdom';

export default (team, retVal) => {
	const jquery = 'http://code.jquery.com/jquery.js';
	const url = 'https://www.nhl.com/' + team;
	const promise = new Promise ((resolve, reject) => {
		jsdom.env(url, [jquery], (err, window) => {
			const leaders = [],
			$ = window.$,
			leaderbord = $('.leaderboard ul .leaderboard__list-item');

			leaderbord.each(function (i, val) {
			 	const item = $(val);
			 	const getTextValue = (selector) => item.find(selector).text();

			 	const leader = {
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