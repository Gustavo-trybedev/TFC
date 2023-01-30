import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/Match.service';

const matchService = new MatchService();

export default class MatchController {
  public getAllMatches = async (_req: Request, res: Response, _Next: NextFunction) => {
    const matches = await matchService.getAllMatches();

    const { inProgress } = _req.query;

    switch (inProgress) {
      case 'true':
        return res.status(200).json(matches.filter((match) => match.inProgress));
      case 'false':
        return res.status(200).json(matches.filter((match) => !match.inProgress));
      default:
        break;
    }

    return res.status(200).json(matches);
  };

  public insertNewMatch = async (req: Request, res: Response, _Next: NextFunction) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    const newMatch = await matchService
      .insertNewMatch({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress });

    return res.status(201).json(newMatch);
  };

  public updateMatch = async (req: Request, res: Response, _Next: NextFunction) => {
    const { id } = req.params;
    await matchService.updateMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };

  public updateScore = async (req: Request, res: Response, _Next: NextFunction) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await matchService.updateMatchScore(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));

    return res.status(200).json({ message: 'Score updated' });
  };
}
