import express from 'express';
import nhl from './lib/nhl';
const app = express();
const port = process.env.PORT || 80;
const router = express.Router();

app.use('/api/v2', router);

router.get('/:team/', (req, res) => {
	nhl(req.params.team).then(stats => {
		res.json(stats);
	});
});

app.listen(port);

console.log(`Up and running on ${port}`);