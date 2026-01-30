export type UserModel = {
  username: string;
  password: string;
};

export type UserRecordModel = {
  id: string;
  username: string;
  passwordHash: string;
  createdAt?: string;
};
