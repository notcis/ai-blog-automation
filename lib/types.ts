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
  user?: Partial<UserType>; // Make user optional
}

export interface BlogType {
  id?: string;
  user?: Partial<UserType>;
  title: string;
  content: string;
  category: string;
  excerpt?: string;
  imageUrl?: string;
  published?: boolean;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
  Like?: Partial<LikeType[]>; // Array of LikeType
}

export interface LikeType {
  id?: string;
  userId: string;
  blogId?: string;
  createdAt?: Date;
}

export interface TicketType {
  id?: string;
  email: string;
  message: string;
  ticketType: string;
  status?: string;
  user?: Partial<UserType>;
  createdAt?: Date;
  updatedAt?: Date;
}
