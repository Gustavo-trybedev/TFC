import { Response, NextFunction } from 'express';
import TeamService from '../services/Team.service';

const teamService = new TeamService();

export default class TeamController {
  public getAllTeams = async (
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const teams = await teamService.getAllTeams();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
