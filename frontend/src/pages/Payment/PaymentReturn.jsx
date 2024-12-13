import React, { useEffect, useState } from 'react';
import { Result, Spin } from 'antd';
import { useLocation } from 'react-router-dom';
import { chargilyPayService } from '@/services/payment/chargilyPay';

export default function PaymentReturn() {
  const [status, setStatus] = useState('loading');
  const location = useLocation();
  //   const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const paymentId = params.get('payment_id');

        if (!paymentId) {
          setStatus('error');
          return;
        }

        const { success } = await chargilyPayService.verifyPayment(paymentId);
        setStatus(success ? 'success' : 'error');

        // Redirect after 3 seconds
        setTimeout(() => {
          //   navigate('/credit');
        }, 3000);
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('error');
      }
    };

    verifyPayment();
  }, [location, navigate]);

  if (status === 'loading') {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <p>Verifying payment...</p>
      </div>
    );
  }

  return (
    <Result
      status={status}
      title={status === 'success' ? 'Payment Successful!' : 'Payment Failed'}
      subTitle={
        status === 'success'
          ? 'Your credit has been recharged successfully. Redirecting...'
          : 'There was an error processing your payment. Please try again.'
      }
    />
  );
}
