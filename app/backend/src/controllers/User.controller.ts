import { Request, Response, NextFunction } from 'express';
import JWTMethods from '../auth/JWT';
import LoginService from '../services/User.service';

const jwt = new JWTMethods();
const userService = new LoginService();

export default class LoginController {
  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const credentials = req.body;
      delete credentials.password;

      const token = jwt.createToken(credentials);

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public getUserRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body.user;

      const user = await userService.getUserByEmail(email);

      return res.status(200).json({ role: user.role });
    } catch (error) {
      next(error);
    }
  };
}
