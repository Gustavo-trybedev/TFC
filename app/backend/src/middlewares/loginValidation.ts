import { Request, Response, NextFunction } from 'express';
import { compareSync } from 'bcryptjs';
import LoginService from '../services/User.service';
import JWTMethods from '../auth/JWT';

const jwt = new JWTMethods();
const loginService = new LoginService();

export default class loginValidation {
  public validateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = req.body;
      const checkFields: boolean = email && password;

      if (!checkFields) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
    } catch (error) {
      console.log(error);
    }

    req.body.user = req.body;

    next();
  };

  public validateToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }
      const authoredUser = jwt.verifyToken(token as string);

      req.body.user = authoredUser;

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };

  public validateFields = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;
    const user = await loginService.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const checkPassword = compareSync(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    req.body.user = user;

    next();
  };
}
