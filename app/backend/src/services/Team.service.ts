import { ITeam } from '../interfaces/ITeam';
import Team from '../database/models/Teams';

export default class TeamService {
  public getAllTeams = async (): Promise<ITeam[] | undefined> => {
    const teams = await Team.findAll();
    if (!teams) return undefined;
    return teams;
  };

  public getTeamById = async (id: number): Promise<ITeam | undefined> => {
    const team = await Team.findOne({ where: { id } });
    if (!team) return undefined;
    return team;
  };
}
