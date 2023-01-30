import { ITeam } from './ITeam';

export interface IMatchesBody {
  id?: number,
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatches extends IMatchesBody {
  homeTeam: ITeam,
  awayTeam: ITeam,
}
