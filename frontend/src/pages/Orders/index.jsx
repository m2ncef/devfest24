import React, { useState } from 'react';
import {
  Table,
  Button,
  Tag,
  Space,
  Card,
  Row,
  Col,
  Statistic,
  Modal,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import { ShoppingCartOutlined, DollarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import DefaultLayout from '@/layout/DefaultLayout';

const { Option } = Select;

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: '1',
      customer: 'John Doe',
      date: '2024-03-15',
      total: 299.97,
      status: 'pending',
      items: 3,
    },
    {
      id: '2',
      customer: 'Jane Smith',
      date: '2024-03-14',
      total: 199.99,
      status: 'shipped',
      items: 1,
    },
    {
      id: '3',
      customer: 'Bob Johnson',
      date: '2024-03-14',
      total: 159.98,
      status: 'delivered',
      items: 2,
    },
    {
      id: '4',
      customer: 'Alice Brown',
      date: '2024-03-13',
      total: 79.99,
      status: 'cancelled',
      items: 1,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        date: new Date().toISOString().split('T')[0],
        total: Number(values.total || 0),
        items: Number(values.items || 0),
      };

      if (editingId) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === editingId ? { ...formattedValues, id: editingId } : order
          )
        );
        message.success('Order updated successfully');
      } else {
        const newOrder = {
          ...formattedValues,
          id: Date.now().toString(),
        };
        setOrders((prev) => [...prev, newOrder]);
        message.success('Order added successfully');
      }

      handleCancel();
    } catch (error) {
      message.error('Error processing the form');
      console.error('Form error:', error);
    }
  };

  const statusColors = {
    pending: 'orange',
    shipped: 'blue',
    delivered: 'green',
    cancelled: 'red',
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `$${total}`,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>
            View Details
          </Button>
          <Button type="link">Update Status</Button>
        </Space>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div style={{ padding: '24px' }}>
        <div className="site-statistic-demo-card" style={{ marginBottom: '24px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Total Orders"
                  value={orders.length}
                  prefix={<ShoppingCartOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Pending Orders"
                  value={orders.filter((o) => o.status === 'pending').length}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Total Revenue"
                  value={orders.reduce((acc, curr) => acc + curr.total, 0)}
                  prefix={<DollarOutlined />}
                  precision={2}
                />
              </Card>
            </Col>
          </Row>
        </div>

        <Card>
          <Button type="primary" style={{ marginBottom: 16 }} onClick={showModal}>
            Add New Order
          </Button>
          <Table columns={columns} dataSource={orders} />
        </Card>

        <Modal
          title="Order Details"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              Submit
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="customer" label="Customer Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="items" label="Number of Items" rules={[{ required: true }]}>
              <Input type="number" min={1} />
            </Form.Item>

            <Form.Item name="total" label="Total Amount" rules={[{ required: true }]}>
              <Input type="number" min={0} step="0.01" prefix="$" />
            </Form.Item>

            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
              <Select>
                <Option value="pending">Pending</Option>
                <Option value="shipped">Shipped</Option>
                <Option value="delivered">Delivered</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default Orders;
