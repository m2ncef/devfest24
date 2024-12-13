import React from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

export default function TrendForm({ isUpdateForm = false }) {
  return (
    <>
      <Form.Item
        label="Metric"
        name="metric"
        rules={[
          {
            required: true,
            message: 'Please input the metric name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: 'Please select the category!',
          },
        ]}
      >
        <Select>
          <Option value="Revenue">Revenue</Option>
          <Option value="Customer">Customer</Option>
          <Option value="Operations">Operations</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Current Value"
        name="current"
        rules={[
          {
            required: true,
            message: 'Please input the current value!',
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Previous Value"
        name="previous"
        rules={[
          {
            required: true,
            message: 'Please input the previous value!',
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Trend"
        name="trend"
        rules={[
          {
            required: true,
            message: 'Please select the trend!',
          },
        ]}
      >
        <Select>
          <Option value="up">Up</Option>
          <Option value="down">Down</Option>
        </Select>
      </Form.Item>
    </>
  );
}
