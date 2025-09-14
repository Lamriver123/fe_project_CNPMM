import axiosClient from './axiosClient.ts';
import type { ProfileResponse } from '../types/User';

export const profileApi = {
    getProfile: async (): Promise<ProfileResponse> => {
        return await axiosClient.get('/profile');
    },

    updateProfile: async (data: Partial<ProfileResponse['data']>): Promise<ProfileResponse> => {
        return await axiosClient.put('/update-profile', data);
    },

    uploadAvatar: async (file: File): Promise<{ success: boolean; data: { avatarUrl: string } }> => {
        const formData = new FormData();
        formData.append('avatar', file);
        return await axiosClient.post('/profile/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};
