const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/payment.controller');
const auth = require('../middleware/auth');

router.post('/create', auth, PaymentController.createPayment);
router.get('/verify/:paymentId', auth, PaymentController.verifyPayment);
router.post('/webhook', PaymentController.handleWebhook);

module.exports = router;
