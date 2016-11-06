
var express = require('express');
var app = express();
var port = process.env.PORT || 80;
var router = express.Router();
var nhl = require('./lib/nhl');


app.use('/api/v1', router);

router.get('/:team/', function (req, res) {

	nhl.stats(req.params.team, req.query.ignoreCache, function (stats) {
		res.json(stats);
	});

});

router.get('/status', function(req, res) {
	res.json('Server is up and running');
});

app.listen(port);

console.log('Running on', port);