export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  createdAt: string;
  updatedAt: string;
  user_name: string;
  role: string;
  phone?: string;
  age?: number;
  password?: string;
  image_url?: string;
}
