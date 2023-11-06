export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  email_verified_at: string;
  account: string;
  role_id: string | number;
  branch_id: string;
  user_status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: string;
}

export interface AuthSignin {
  account: string;
  password: string;
}

export interface AuthSignup {
  id: any;
  account: string;
  username: string;
  date_of_birth: Date;
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}
