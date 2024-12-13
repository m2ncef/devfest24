const axios = require('axios');
const config = require('../config');

class PaymentService {
  constructor() {
    this.apiKey = config.chargily.apiKey;
    this.apiSecret = config.chargily.apiSecret;
    this.baseUrl = 'https://pay.chargily.net/api/v1';
  }

  async createPayment(data) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/payment`,
        {
          amount: data.amount,
          payment_method: data.paymentMethod,
          client_email: data.email,
          client_name: data.name,
          description: 'Credit recharge',
          webhook_url: config.chargily.webhookUrl,
          back_url: config.chargily.backUrl,
        },
        {
          headers: {
            'X-Authorization': this.apiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error('Failed to create payment with Chargily');
    }
  }

  async verifyPayment(paymentId) {
    try {
      const response = await axios.get(`${this.baseUrl}/payment/${paymentId}`, {
        headers: {
          'X-Authorization': this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Failed to verify payment with Chargily');
    }
  }
}

module.exports = new PaymentService();
