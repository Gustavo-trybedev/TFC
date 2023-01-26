import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/ILogin';
import 'dotenv/config';

const jwtConfig: object = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

export default class JWTMethods {
  private _secret: string;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'jwt_secret';
  }

  public createToken = (credentials: IUser) => {
    const token = jwt.sign(credentials, this._secret as jwt.Secret, jwtConfig);
    return token;
  };

  public verifyToken = (token: string) => {
    const user = jwt.verify(token, this._secret as jwt.Secret);
    return user;
  };
}
