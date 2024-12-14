import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Layout, Col, Divider } from 'antd';
import { Typography } from 'antd';
import { signup } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import SignupForm from '@/forms/SignupForm';
import AuthLayout from '@/layout/AuthLayout';
import logo from '@/style/images/logo.png';

const { Content } = Layout;
const { Title } = Typography;

const SignupPage = () => {
  const { loading: isLoading } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(signup({ signupData: values }));
  };

  return (
    <>
      <AuthLayout>
        <Content
          style={{
            padding: '200px 30px 30px',
            maxWidth: '440px',
            margin: '0 auto',
          }}
        >
          <Col span={0}>
            <img
              src={logo}
              alt="Logo"
              style={{
                margin: '-70px auto 40px',
                display: 'block',
              }}
            />
            <div className="space50"></div>
          </Col>
          <Title level={1}>Create Account</Title>

          <Divider />
          <div className="site-layout-content">
            <Form
              name="normal_signup"
              className="signup-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <SignupForm />
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="signup-form-button"
                  loading={isLoading}
                  size="large"
                  block
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </AuthLayout>
    </>
  );
};

export default SignupPage;
