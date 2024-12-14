import SelectAsync from '@/components/SelectAsync';
import { Form, Input, InputNumber, Select } from 'antd';

export default function AdminForm({ isUpdateForm = false }) {
  return (
    <>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Account Type"
        name="accountType"
        rules={[
          {
            required: true,
            message: 'Please select account type!',
          },
        ]}
      >
        <Select>
          <Select.Option value="default">Default</Select.Option>
          <Select.Option value="ecommerce">E-commerce</Select.Option>
          <Select.Option value="designer">Designer</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Credit"
        name="credit"
        rules={[
          {
            required: true,
            message: 'Please input credit!',
          },
        ]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        label="Status"
        name="enabled"
        rules={[
          {
            required: true,
            message: 'Please select status!',
          },
        ]}
      >
        <Select>
          <Select.Option value={true}>Active</Select.Option>
          <Select.Option value={false}>Disabled</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Surname"
        name="surname"
        rules={[
          {
            required: true,
            message: 'Please input your surname!',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      {!isUpdateForm && (
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      )}
      <Form.Item
        label="Role"
        name="role"
        rules={[
          {
            required: true,
            message: 'This Field is required',
          },
        ]}
      >
        <Select>
          <Select.Option value="superadmin">Superadmin</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}
