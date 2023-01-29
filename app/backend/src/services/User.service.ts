import { IUser } from '../interfaces/ILogin';
import UserModel from '../database/models/Users';

export default class LoginService {
  public getUserByEmail = async (email: string): Promise<IUser> => {
    const user = await UserModel.findOne({ where: { email } });
    return user as IUser;
  };
}
