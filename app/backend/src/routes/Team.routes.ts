import * as express from 'express';
import TeamController from '../controllers/Team.controller';

const teamController = new TeamController();

const router = express.Router();

router.get('/', teamController.getAllTeams);

router.get('/:id', teamController.getTeamById);

export default router;
