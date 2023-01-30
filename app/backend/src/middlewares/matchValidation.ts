import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/Team.service';

const teamsService = new TeamsService();

export default class MatchValidation {
  public validateTeams = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;

    try {
      if (homeTeamId === awayTeamId) {
        return res.status(422)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };

  public validateTeamExistence = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;

    try {
      const homeTeam = await teamsService.getTeamById(Number(homeTeamId));
      const awayTeam = await teamsService.getTeamById(Number(awayTeamId));

      if (!homeTeam || !awayTeam) {
        return res.status(404)
          .json({ message: 'There is no team with such id!' });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };
}
