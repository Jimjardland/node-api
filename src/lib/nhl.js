import redis from 'redis';
import leaderboard from './leaderboard';
const cache = redis.createClient();

 export default (team, ignoreCache) => {
	const promise = new Promise ((resolve, reject) => {
		const cacheKey = team;
		cache.get(cacheKey, (err, cachedValue) => {

			if(cachedValue && !ignoreCache) {
				resolve(JSON.parse(cachedValue))
			} else {
				leaderboard(team).then(players => {
					cache.set(cacheKey, JSON.stringify(players))
					cache.expire(cacheKey, 30);

					resolve(players);
				});
			}
		});
	});
	return promise;
}