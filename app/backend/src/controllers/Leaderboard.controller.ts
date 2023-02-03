import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

const leaderBoardService = new LeaderboardService();

export default class LeaderboardController {
  public getLeaderboardData = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const leaderboardData = await leaderBoardService.tieBreaker();
      res.status(200).send(leaderboardData);
    } catch (error) {
      next(error);
    }
  };
}
