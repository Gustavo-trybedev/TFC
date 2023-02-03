import TeamModel from '../database/models/Teams';
import MatchModel from '../database/models/Matches';
import LeaderboardUtils from '../utils/leaderboardUtils';

import { ILeaderBoardStats } from '../interfaces/ILeaderboard';

const leaderboardUtils = new LeaderboardUtils();

export default class LeaderboardService {
  public getHomeMatches = async (id: number) => {
    const homeMatches = await MatchModel.findAll({
      where: {
        homeTeamId: id,
        inProgress: 0,
      },
      include: [
        { model: TeamModel, as: 'homeTeam' },
        { model: TeamModel, as: 'awayTeam' },
      ],
    });

    return homeMatches as unknown as MatchModel[];
  };

  public getHomeData = async () => {
    const teams = await TeamModel.findAll();

    const homeTeams = teams.map((team) => this.getHomeMatches(team.id));

    const homeTeamsData = await Promise.all(homeTeams);

    return homeTeamsData as unknown as MatchModel[][];
  };

  public getLeaderboardData = async () => {
    const teams = await TeamModel.findAll();
    // console.log(teams);

    const data = await this.getHomeData();
    // console.log(data);

    const board = data.map((homeTeam, index) => ({
      name: teams[index].teamName,
      totalPoints: homeTeam.reduce(leaderboardUtils.totalPoints, 0),
      totalGames: homeTeam.reduce(leaderboardUtils.totalHomeGames, 0),
      totalVictories: homeTeam.reduce(leaderboardUtils.totalHomeVictories, 0),
      totalDraws: homeTeam.reduce(leaderboardUtils.totalDraws, 0),
      totalLosses: homeTeam.reduce(leaderboardUtils.totalHomeLosses, 0),
      goalsFavor: homeTeam.reduce(leaderboardUtils.goalsFavor, 0),
      goalsOwn: homeTeam.reduce(leaderboardUtils.goalsOwn, 0),
      goalsBalance: homeTeam.reduce(leaderboardUtils.goalsBalance, 0),
      efficiency:
      ((homeTeam.reduce(leaderboardUtils.totalPoints, 0)
      / (homeTeam.reduce(leaderboardUtils.totalHomeGames, 0) * 3)) * 100).toFixed(2),
    }));
    // console.log(board);
    return board;
  };

  public tieBreaker = async () => {
    const leaderboard = await this.getLeaderboardData();

    const sorted = leaderboard.sort((a: ILeaderBoardStats, b: ILeaderBoardStats) => {
      switch (true) {
        case b.totalPoints - a.totalPoints !== 0:
          return b.totalPoints - a.totalPoints;

        case b.totalVictories - a.totalVictories !== 0:
          return b.totalVictories - a.totalVictories;

        case b.goalsBalance - a.goalsBalance !== 0:
          return b.goalsBalance - a.goalsBalance;

        default:
          return b.goalsFavor - a.goalsFavor;
      }
    });

    return sorted as unknown as ILeaderBoardStats;
  };
}
