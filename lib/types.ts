export interface UserType {
  id?: string;
  name: string;
  username: string;
  role: string;
  email: string;
  password?: string;
  website?: string;
  about?: string;
  createdAt?: Date;
}

export interface AuthResponseType {
  success: boolean;
  message: string;
  user?: Partial<UserType>;
}
