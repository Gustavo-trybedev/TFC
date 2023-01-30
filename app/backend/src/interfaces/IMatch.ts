import { ITeam } from './ITeam';

export interface IMatchesID {
  id: number,
}
export interface IMatchesBody {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatches extends IMatchesBody, IMatchesID {
  homeTeam: ITeam,
  awayTeam: ITeam,
}
