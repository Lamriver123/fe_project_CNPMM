import axiosClient from './axiosClient.ts';

export const paymentApi = {
    createQr: async (): Promise<{ success: boolean; url: string }> => {
        return await axiosClient.post('/payment/create-qr');
    },
};
