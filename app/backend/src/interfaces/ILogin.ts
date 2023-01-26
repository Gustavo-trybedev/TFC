export interface IUser {
  id?: number;
  username: string;
  role: string;
}

export interface ILogin extends IUser {
  email: string;
  password: string;
}
