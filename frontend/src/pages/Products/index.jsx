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
import { ShoppingOutlined, DollarOutlined, TagOutlined } from '@ant-design/icons';
import DefaultLayout from '@/layout/DefaultLayout';

const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 99.99,
      category: 'Electronics',
      stock: 45,
      status: 'active',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      category: 'Electronics',
      stock: 30,
      status: 'active',
    },
    {
      id: '3',
      name: 'Running Shoes',
      price: 79.99,
      category: 'Sports',
      stock: 0,
      status: 'out_of_stock',
    },
    {
      id: '4',
      name: 'Laptop Bag',
      price: 49.99,
      category: 'Accessories',
      stock: 15,
      status: 'active',
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
  };

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        price: Number(values.price || 0),
        stock: Number(values.stock || 0),
        status: values.stock === 0 ? 'out_of_stock' : values.status,
      };

      if (editingId) {
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === editingId ? { ...formattedValues, id: editingId } : p))
        );
        message.success('Product updated successfully');
      } else {
        const newProduct = {
          ...formattedValues,
          id: Date.now().toString(),
        };
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        message.success('Product added successfully');
      }

      handleCancel();
    } catch (error) {
      message.error('Error processing the form');
      console.error('Form error:', error);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setProducts(products.filter((p) => p.id !== id));
        message.success('Product deleted successfully');
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Electronics', value: 'Electronics' },
        { text: 'Sports', value: 'Sports' },
        { text: 'Accessories', value: 'Accessories' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => (
        <Tag color={stock === 0 ? 'red' : stock < 20 ? 'orange' : 'green'}>{stock} units</Tag>
      ),
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Active' : 'Out of Stock'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
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
                  title="Total Products"
                  value={products.length}
                  prefix={<ShoppingOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Out of Stock"
                  value={products.filter((p) => p.stock === 0).length}
                  prefix={<TagOutlined />}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Total Value"
                  value={products.reduce((acc, curr) => acc + curr.price * curr.stock, 0)}
                  prefix={<DollarOutlined />}
                  precision={2}
                />
              </Card>
            </Col>
          </Row>
        </div>

        <Card>
          <Button type="primary" style={{ marginBottom: 16 }} onClick={showModal}>
            Add New Product
          </Button>
          <Table
            columns={columns}
            dataSource={products}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        </Card>

        <Modal
          title="Add New Product"
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
            <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>

            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
              <Select>
                <Option value="Electronics">Electronics</Option>
                <Option value="Sports">Sports</Option>
                <Option value="Accessories">Accessories</Option>
              </Select>
            </Form.Item>

            <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>

            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
              <Select>
                <Option value="active">Active</Option>
                <Option value="out_of_stock">Out of Stock</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default Products;
