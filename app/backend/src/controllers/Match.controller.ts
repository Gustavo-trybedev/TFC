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
}
