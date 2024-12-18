import React, { useState, useEffect } from 'react';
import {
  Form,
  InputNumber,
  Card,
  Space,
  Radio,
  message,
  Spin,
  Steps,
  Row,
  Col,
  Image,
  Button,
  Typography,
} from 'antd';
import {
  WalletOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  SafetyOutlined,
  LockOutlined,
} from '@ant-design/icons';
import CrudLayout from '@/layout/CrudLayout';
import ChargilyPayButton from '@/components/Payment/ChargilyPayButton';
import { request } from '@/request';

const { Step } = Steps;
const { Title, Text } = Typography;

export default function Credit() {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentData, setPaymentData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { result, success } = await request.get({ entity: 'admin/profile' });
        if (success) {
          setUserData(result);
        }
      } catch (error) {
        message.error('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleFormFinish = (values) => {
    setPaymentData(values);
    setCurrentStep(1);
  };

  const renderAmountForm = () => (
    <Form form={form} layout="vertical" onFinish={handleFormFinish} style={{ maxWidth: 500 }}>
      <Form.Item
        name="amount"
        label="Amount (DZD)"
        rules={[
          { required: true, message: 'Please input amount' },
          { type: 'number', min: 1000, message: 'Minimum amount is 1000 DZD' },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={1000}
          step={100}
          formatter={(value) => `DZD ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/DZD\s?|(,*)/g, '')}
        />
      </Form.Item>

      <Form.Item
        name="paymentMethod"
        label="Payment Method"
        rules={[{ required: true, message: 'Please select payment method' }]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="ccp">CCP</Radio>
            <Radio value="cib">CIB</Radio>
            <Radio value="edahabia">E-Dahabia</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Continue to Payment
        </Button>
      </Form.Item>
    </Form>
  );

  const renderPaymentConfirmation = () => {
    if (!userData || !paymentData) return null;

    const data = {
      amount: paymentData.amount,
      paymentMethod: paymentData.paymentMethod,
      email: userData.email,
      name: `${userData.name} ${userData.surname}`,
    };

    return (
      <div style={{ maxWidth: 500 }}>
        <Card>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div>
              <div style={{ color: '#8c8c8c' }}>Amount</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                DZD {paymentData.amount.toLocaleString()}
              </div>
            </div>
            <div>
              <div style={{ color: '#8c8c8c' }}>Payment Method</div>
              <div style={{ fontSize: '16px' }}>{paymentData.paymentMethod.toUpperCase()}</div>
            </div>
            <ChargilyPayButton
              {...data}
              onError={(error) => {
                message.error(error);
              }}
            />
          </Space>
        </Card>
      </div>
    );
  };

  const config = {
    entity: 'credit',
    header: {
      title: 'Recharge Credit',
      icon: <WalletOutlined />,
    },
    disablePanel: true,
  };

  if (loading) {
    return (
      <CrudLayout config={config}>
        <Card>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
            <p>Loading user data...</p>
          </div>
        </Card>
      </CrudLayout>
    );
  }

  return (
    <CrudLayout config={config}>
      <Card>
        <Steps current={currentStep} style={{ maxWidth: 800, margin: '0 auto 40px' }}>
          <Step title="Amount" icon={<WalletOutlined />} />
          <Step title="Payment" icon={<CreditCardOutlined />} />
          <Step title="Complete" icon={<CheckCircleOutlined />} />
        </Steps>

        <Row gutter={48} align="middle" justify="center">
          <Col xs={24} md={12}>
            {currentStep === 0 ? renderAmountForm() : renderPaymentConfirmation()}
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
              <Title
                level={3}
                style={{
                  background: 'linear-gradient(45deg, #8B5CF6, #1F2937)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Secure Payment Processing
              </Title>
              <Text style={{ fontSize: '16px', color: '#6B7280' }}>
                Recharge your account safely and instantly
              </Text>
            </div>

            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <Card
                style={{
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  borderRadius: '16px',
                  border: 'none',
                }}
              >
                <Space align="center">
                  <LockOutlined style={{ fontSize: '24px', color: '#fff' }} />
                  <Text style={{ color: '#fff', fontSize: '16px' }}>256-bit SSL Encryption</Text>
                </Space>
              </Card>

              <Card
                style={{
                  background: '#F3F4F6',
                  borderRadius: '16px',
                }}
              >
                <Space align="center">
                  <SafetyOutlined style={{ fontSize: '24px', color: '#4F46E5' }} />
                  <Text style={{ color: '#374151', fontSize: '16px' }}>
                    100% Secure Transactions
                  </Text>
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>
      </Card>
    </CrudLayout>
  );
}
