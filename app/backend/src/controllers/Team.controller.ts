import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/Team.service';

const teamService = new TeamService();

export default class TeamController {
  public getAllTeams = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const teams = await teamService.getAllTeams();
    return res.status(200).json(teams);
  };

  public getTeamById = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { id } = req.params;
    const team = await teamService.getTeamById(Number(id));
    return res.status(200).json(team);
  };
}
