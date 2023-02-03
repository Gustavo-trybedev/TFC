import Match from '../database/models/Matches';

export default class leaderboardUtils {
  public totalPoints = (acc: number, match: Match): number => {
    const homevictory = match.homeTeamGoals > match.awayTeamGoals;
    const draw = match.homeTeamGoals === match.awayTeamGoals;

    if (homevictory) return acc + 3;
    if (draw) return acc + 1;

    return acc;
  };

  public totalHomeGames = (acc: number): number => acc + 1;

  public totalHomeVictories = (acc: number, match: Match): number => {
    const homevictory = match.homeTeamGoals > match.awayTeamGoals;
    if (homevictory) return acc + 1;
    return acc;
  };

  public totalDraws = (acc: number, match: Match): number => {
    const draw = match.homeTeamGoals === match.awayTeamGoals;
    if (draw) return acc + 1;
    return acc;
  };

  public totalHomeLosses = (acc: number, match: Match): number => {
    const awayvictory = match.homeTeamGoals < match.awayTeamGoals;
    if (awayvictory) return acc + 1;
    return acc;
  };

  public goalsFavor = (acc: number, match: Match): number => {
    const homeGoals = match.homeTeamGoals;
    return acc + homeGoals;
  };

  public goalsOwn = (acc: number, match: Match): number => {
    const awayGoals = match.awayTeamGoals;
    return acc + awayGoals;
  };

  public goalsBalance = (curr: number, match: Match): number => {
    const homeGoals = match.homeTeamGoals;
    const awayGoals = match.awayTeamGoals;

    return curr + homeGoals - awayGoals;
  };
}
