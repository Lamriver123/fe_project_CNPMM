import { User } from "./User";

export interface Review {
  _id: string;
  product: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  success: boolean;
  count: number;
  data: Review[];
  message?: string;
  error?: string;
}