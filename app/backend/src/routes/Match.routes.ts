import * as express from 'express';
import MatchController from '../controllers/Match.controller';

const matchController = new MatchController();

const router = express.Router();

router.get('/', matchController.getAllMatches);

export default router;
