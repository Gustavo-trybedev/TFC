import * as express from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderboardController = new LeaderboardController();

const router = express.Router();

router.get('/home', leaderboardController.getLeaderboardData);

export default router;
