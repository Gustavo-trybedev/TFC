import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/Team.service';
import JWTMethods from '../auth/JWT';

const jwt = new JWTMethods();
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

  public validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });

    try {
      const data = jwt.verifyToken(token as string);

      if (!data) return res.status(401).json({ message: 'Token must be a valid token' });
    } catch (error) {
      if (error instanceof Error) {
        const { message } = error;
        if (message) return res.status(401).json({ message: 'Token must be a valid token' });
      } else {
        console.log(error);
      }
    }

    next();
  };
}
