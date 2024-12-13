import React, { useState } from 'react';
import { Button, Space, Tag, Card } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ReloadOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import CrudLayout from '@/layout/CrudLayout';

function Trends() {
  const [loading, setLoading] = useState(false);

  const entity = 'trend';
  const config = {
    entity,
    header: {
      title: 'Performance Trends',
      icon: <LineChartOutlined />,
    },
    disablePanel: true,
  };

  const mockData = [
    {
      _id: '1',
      metric: 'Total Sales',
      current: 150000,
      previous: 120000,
      change: 25,
      trend: 'up',
      category: 'Revenue',
    },
    {
      _id: '2',
      metric: 'New Customers',
      current: 250,
      previous: 200,
      change: 25,
      trend: 'up',
      category: 'Customer',
    },
    {
      _id: '3',
      metric: 'Average Order Value',
      current: 600,
      previous: 650,
      change: -7.7,
      trend: 'down',
      category: 'Revenue',
    },
    {
      _id: '4',
      metric: 'Customer Satisfaction',
      current: 4.5,
      previous: 4.2,
      change: 7.1,
      trend: 'up',
      category: 'Customer',
    },
    {
      _id: '5',
      metric: 'Payment Processing Time',
      current: 2.5,
      previous: 3.2,
      change: -21.9,
      trend: 'down',
      category: 'Operations',
    },
  ];

  const renderMetricRow = (item) => {
    const isPositive = item.trend === 'up';
    const color = isPositive ? '#3f8600' : '#cf1322';
    const value = String(item.metric).includes('Time')
      ? `${item.current} days`
      : String(item.metric).includes('Satisfaction')
      ? `${item.current}/5.0`
      : item.category === 'Revenue'
      ? `$${item.current.toLocaleString()}`
      : item.current.toLocaleString();

    const previousValue = String(item.metric).includes('Time')
      ? `${item.previous} days`
      : String(item.metric).includes('Satisfaction')
      ? `${item.previous}/5.0`
      : item.category === 'Revenue'
      ? `$${item.previous.toLocaleString()}`
      : item.previous.toLocaleString();

    return (
      <div key={item._id} style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
        <Space size="large" style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space direction="vertical" size={4}>
            <span style={{ fontSize: '16px', fontWeight: 500 }}>{item.metric}</span>
            <Tag color="blue">{item.category}</Tag>
          </Space>
          <Space size="large">
            <Space direction="vertical" size={2} style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '16px', fontWeight: 500 }}>{value}</span>
              <small style={{ color: '#8c8c8c' }}>Current</small>
            </Space>
            <Space direction="vertical" size={2} style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '16px' }}>{previousValue}</span>
              <small style={{ color: '#8c8c8c' }}>Previous</small>
            </Space>
            <Space direction="vertical" size={2} style={{ textAlign: 'right', minWidth: '80px' }}>
              <Space>
                {isPositive ? (
                  <ArrowUpOutlined style={{ color }} />
                ) : (
                  <ArrowDownOutlined style={{ color }} />
                )}
                <span style={{ color, fontSize: '16px' }}>{Math.abs(item.change)}%</span>
              </Space>
              <small style={{ color: '#8c8c8c' }}>Change</small>
            </Space>
          </Space>
        </Space>
      </div>
    );
  };

  return (
    <CrudLayout config={config}>
      <Card
        extra={
          <Button icon={<ReloadOutlined />} onClick={() => setLoading(!loading)}>
            Refresh
          </Button>
        }
      >
        {mockData.map(renderMetricRow)}
      </Card>
    </CrudLayout>
  );
}

export default Trends;
