import MatchesModel from '../database/models/Matches';
import { IMatches } from '../interfaces/IMatch';
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
}
