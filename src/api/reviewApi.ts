import { ReviewResponse } from '../types/Review';
import axiosClient from './axiosClient.ts';

export const reviewApi = {
  getReviewsByProduct: (productId: string): Promise<ReviewResponse> => {
    return axiosClient.get(`/products/${productId}/reviews`);
  }
};