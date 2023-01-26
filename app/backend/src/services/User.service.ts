import { ILogin } from '../interfaces/ILogin';
import User from '../database/models/Users';

export default class LoginService {
  public getUserByEmail = async (email: string): Promise<ILogin | undefined> => {
    const user = await User.findOne({ where: { email } });
    if (!user) return undefined;
    return user;
  };
}
