export type User = {
  id: number;
  username: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};