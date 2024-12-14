import React from 'react';
import { Form, Input, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, ShopOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function SignupForm() {
  return (
    <>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your Name!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Full Name"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
          {
            type: 'email',
            message: 'Please enter a valid email!',
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
          autoComplete="email"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="accountType"
        rules={[
          {
            required: true,
            message: 'Please select account type!',
          },
        ]}
      >
        <Select
          size="large"
          placeholder="Select Account Type"
          prefix={<ShopOutlined className="site-form-item-icon" />}
        >
          <Option value="default">Default</Option>
          <Option value="ecommerce">E-commerce</Option>
          <Option value="designer">Designer</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
          {
            min: 8,
            message: 'Password must be at least 8 characters!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirm Password"
          size="large"
        />
      </Form.Item>
    </>
  );
}
