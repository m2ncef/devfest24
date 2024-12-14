import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Typography,
  Space,
  Statistic,
  Progress,
  List,
  Avatar,
  Timeline,
  Tag,
} from 'antd';
import {
  UserOutlined,
  RiseOutlined,
  DollarOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const { Title, Text } = Typography;

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  const revenueData = [
    { month: 'Jan', value: 3000 },
    { month: 'Feb', value: 3500 },
    { month: 'Mar', value: 4200 },
    { month: 'Apr', value: 3800 },
    { month: 'May', value: 5000 },
    { month: 'Jun', value: 4800 },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title="Total Users"
                value={2456}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
              <Progress percent={70} status="active" />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title="Revenue"
                value={23567}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#cf1322' }}
              />
              <Progress percent={85} status="active" strokeColor="#cf1322" />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title="Growth"
                value={12.3}
                prefix={<RiseOutlined />}
                suffix="%"
                valueStyle={{ color: '#1890ff' }}
              />
              <Progress percent={12.3} status="active" strokeColor="#1890ff" />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title="Orders"
                value={789}
                prefix={<ShoppingOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
              <Progress percent={45} status="active" strokeColor="#722ed1" />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card title="Revenue Overview" hoverable>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#1890ff" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Recent Activities" hoverable>
              <Timeline>
                <Timeline.Item color="green">New user registration</Timeline.Item>
                <Timeline.Item color="blue">System update completed</Timeline.Item>
                <Timeline.Item color="red">Server error detected</Timeline.Item>
                <Timeline.Item>Network maintenance</Timeline.Item>
              </Timeline>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
