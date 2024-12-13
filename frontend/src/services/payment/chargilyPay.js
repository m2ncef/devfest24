import { request } from '@/request';

export const chargilyPayService = {
  createPayment: async (data) => {
    try {
      const response = await request.post({
        entity: 'api/payment/chargily/create',
        body: data,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to create payment');
    }
  },

  verifyPayment: async (paymentId) => {
    try {
      const response = await request.get({
        entity: `api/payment/chargily/verify/${paymentId}`,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to verify payment');
    }
  },
};
