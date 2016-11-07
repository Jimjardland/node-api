'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _nhl = require('./lib/nhl');

var _nhl2 = _interopRequireDefault(_nhl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 80;
var router = _express2.default.Router();

app.use('/api/v2', router);

router.get('/:team/', function (req, res) {
	(0, _nhl2.default)(req.params.team).then(function (stats) {
		res.json(stats);
	});
});

app.listen(port);

console.log('Up and running on ' + port);