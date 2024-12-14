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
  Progress,
  Modal,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import { InboxOutlined, WarningOutlined, SyncOutlined } from '@ant-design/icons';
import DefaultLayout from '@/layout/DefaultLayout';

const { Option } = Select;

const Inventory = () => {
  const [inventory, setInventory] = useState([
    {
      id: '1',
      sku: 'WH-001',
      name: 'Wireless Headphones',
      quantity: 45,
      reorderPoint: 20,
      lastRestocked: '2024-03-10',
      location: 'A-123',
    },
    {
      id: '2',
      sku: 'SW-002',
      name: 'Smart Watch',
      quantity: 15,
      reorderPoint: 25,
      lastRestocked: '2024-03-08',
      location: 'B-234',
    },
    {
      id: '3',
      sku: 'RS-003',
      name: 'Running Shoes',
      quantity: 0,
      reorderPoint: 10,
      lastRestocked: '2024-03-01',
      location: 'C-345',
    },
    {
      id: '4',
      sku: 'LB-004',
      name: 'Laptop Bag',
      quantity: 30,
      reorderPoint: 15,
      lastRestocked: '2024-03-12',
      location: 'D-456',
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
        quantity: Number(values.quantity || 0),
        reorderPoint: Number(values.reorderPoint || 0),
        lastRestocked: new Date().toISOString().split('T')[0],
      };

      if (editingId) {
        setInventory((prev) =>
          prev.map((item) => (item.id === editingId ? { ...formattedValues, id: editingId } : item))
        );
        message.success('Inventory item updated successfully');
      } else {
        const newItem = {
          ...formattedValues,
          id: Date.now().toString(),
        };
        setInventory((prev) => [...prev, newItem]);
        message.success('Inventory item added successfully');
      }

      handleCancel();
    } catch (error) {
      message.error('Error processing the form');
      console.error('Form error:', error);
    }
  };

  const columns = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Stock Level',
      key: 'stockLevel',
      render: (_, record) => (
        <Space direction="vertical" style={{ width: '100%' }}>
          <span>{record.quantity} units</span>
          <Progress
            percent={(record.quantity / record.reorderPoint) * 100}
            status={record.quantity < record.reorderPoint ? 'exception' : 'normal'}
            showInfo={false}
          />
        </Space>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag
          color={
            record.quantity === 0
              ? 'red'
              : record.quantity < record.reorderPoint
              ? 'orange'
              : 'green'
          }
        >
          {record.quantity === 0
            ? 'Out of Stock'
            : record.quantity < record.reorderPoint
            ? 'Low Stock'
            : 'In Stock'}
        </Tag>
      ),
    },
    {
      title: 'Last Restocked',
      dataIndex: 'lastRestocked',
      key: 'lastRestocked',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>
            Restock
          </Button>
          <Button type="link">Adjust</Button>
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
                  title="Total Items"
                  value={inventory.reduce((acc, curr) => acc + curr.quantity, 0)}
                  prefix={<InboxOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Low Stock Items"
                  value={inventory.filter((item) => item.quantity < item.reorderPoint).length}
                  prefix={<WarningOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Out of Stock"
                  value={inventory.filter((item) => item.quantity === 0).length}
                  prefix={<SyncOutlined />}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        <Card>
          <Button type="primary" style={{ marginBottom: 16 }} onClick={showModal}>
            Add New Item
          </Button>
          <Table columns={columns} dataSource={inventory} />
        </Card>

        <Modal
          title="Add Inventory Item"
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
            <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
              <Input type="number" min={0} />
            </Form.Item>

            <Form.Item name="reorderPoint" label="Reorder Point" rules={[{ required: true }]}>
              <Input type="number" min={0} />
            </Form.Item>

            <Form.Item name="location" label="Location" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default Inventory;
