import { Request, Response, NextFunction } from 'express';
import JWTMethods from '../auth/JWT';

const jwt = new JWTMethods();

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

  public userRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user } = req.body;

      if (user.email === 'admin@admin.com') {
        return res.status(200).json({ role: 'admin' });
      }
    } catch (error) {
      next(error);
    }
  };
}
