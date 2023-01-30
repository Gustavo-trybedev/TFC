import MatchesModel from '../database/models/Matches';
import { IMatches, IMatchesBody } from '../interfaces/IMatch';
import Team from '../database/models/Teams';

export default class MatchesService {
  public getAllMatches = async () => {
    const matches = await MatchesModel.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matches as unknown as IMatches[];
  };

  public insertNewMatch = async (match: IMatchesBody): Promise<IMatchesBody> => {
    const newMatch = await MatchesModel.create({ ...match, inProgress: true });

    return newMatch;
  };

  public updateMatch = async (id: number): Promise<IMatchesBody | undefined> => {
    const match = await MatchesModel.findByPk(id);

    if (!match) return undefined;

    await match.update({ ...match, inProgress: false });

    return match;
  };
}
