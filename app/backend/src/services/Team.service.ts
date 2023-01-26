import { ITeam } from '../interfaces/ITeam';
import Team from '../database/models/Teams';

export default class TeamService {
  public getAllTeams = async (): Promise<ITeam[] | undefined> => {
    const team = await Team.findAll();
    if (!team) return undefined;
    return team;
  };
}
