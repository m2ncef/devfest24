import React from 'react';
import { Button } from 'antd';
import { chargilyPayService } from '@/services/payment/chargilyPay';

export default function ChargilyPayButton({ amount, paymentMethod, email, name, onError }) {
  const handlePayment = async () => {
    try {
      console.log('Payment data:', { amount, paymentMethod, email, name }); // Debug log

      const { success, result } = await chargilyPayService.createPayment({
        amount,
        paymentMethod,
        email,
        name,
      });

      console.log('Payment response:', { success, result }); // Debug log

      if (success && result.checkout_url) {
        window.location.href = result.checkout_url;
      } else {
        onError?.('Failed to initialize payment');
      }
    } catch (error) {
      console.error('Payment error:', error); // Debug log
      onError?.(error.message);
    }
  };

  return (
    <Button type="primary" onClick={handlePayment} block>
      Pay with Chargily
    </Button>
  );
}
