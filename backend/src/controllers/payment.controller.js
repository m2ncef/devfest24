const PaymentService = require('../services/payment.service');
// const UserService = require('../services/user.service');

class PaymentController {
  constructor() {
    // Bind methods to ensure proper 'this' context
    this.createPayment = this.createPayment.bind(this);
    this.verifyPayment = this.verifyPayment.bind(this);
    this.handleWebhook = this.handleWebhook.bind(this);
  }

  async createPayment(req, res) {
    try {
      const paymentData = req.body;
      console.log('Creating payment with data:', paymentData); // Debug log

      const payment = await PaymentService.createPayment(paymentData);

      // Store payment info in database
      await this.storePaymentInfo(payment, req.user.id);

      console.log('Payment created:', payment); // Debug log

      res.json({
        success: true,
        result: {
          checkout_url: payment.checkout_url,
          payment_id: payment.id,
        },
      });
    } catch (error) {
      console.error('Payment creation error:', error); // Debug log
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to create payment',
      });
    }
  }

  async verifyPayment(req, res) {
    try {
      const { paymentId } = req.params;
      const payment = await PaymentService.verifyPayment(paymentId);

      if (payment.status === 'paid') {
        await UserService.updateCredit(req.user.id, payment.amount);
      }

      res.json({
        success: true,
        result: payment,
      });
    } catch (error) {
      console.error('Payment verification error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to verify payment',
      });
    }
  }

  async handleWebhook(req, res) {
    try {
      const paymentData = req.body;
      console.log('Received webhook data:', paymentData); // Debug log

      if (paymentData.status === 'paid') {
        const payment = await this.getPaymentInfo(paymentData.payment_id);
        await UserService.updateCredit(payment.userId, paymentData.amount);
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Webhook handling error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to handle webhook',
      });
    }
  }

  // Helper methods for database operations
  async storePaymentInfo(payment, userId) {
    // TODO: Implement storing payment info in your database
    console.log('Storing payment info:', { payment, userId });
  }

  async getPaymentInfo(paymentId) {
    // TODO: Implement retrieving payment info from your database
    console.log('Retrieving payment info for:', paymentId);
    return null;
  }
}

module.exports = new PaymentController();
