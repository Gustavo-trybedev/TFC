import * as express from 'express';
import MatchController from '../controllers/Match.controller';
import MatchValidation from '../middlewares/matchValidation';

const matchController = new MatchController();
const matchValidation = new MatchValidation();

const router = express.Router();

router.get('/', matchController.getAllMatches);
router.post(
  '/',
  matchValidation.validateTeamExistence,
  matchValidation.validateTeams,
  matchValidation.validateToken,
  matchController.insertNewMatch,
);
router.patch('/:id/finish', matchController.updateMatch);
router.patch('/:id/', matchController.updateScore);

export default router;
