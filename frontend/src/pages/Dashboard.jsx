import React from 'react';
import { Row, Col, Card, Statistic, Tag, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { DashboardLayout } from '@/layout';

const StatisticCard = ({ title, value, prefix, trend }) => {
  const isPositive = trend === 'up';
  const color = isPositive ? '#3f8600' : '#cf1322';

  return (
    <Col xs={24} sm={12} md={12} lg={6}>
      <Card className="dashboard-card">
        <Statistic
          title={title}
          value={value}
          precision={2}
          valueStyle={{ color }}
          prefix={prefix}
          suffix={
            <Space>
              <span>DZD</span>
              {isPositive ? (
                <ArrowUpOutlined style={{ color }} />
              ) : (
                <ArrowDownOutlined style={{ color }} />
              )}
            </Space>
          }
        />
      </Card>
    </Col>
  );
};

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: 34000,
      prefix: 'This Month',
      trend: 'up',
    },
    {
      title: 'Pending Quotes',
      value: 12000,
      prefix: 'Active',
      trend: 'up',
    },
    {
      title: 'Total Payments',
      value: 28000,
      prefix: 'Received',
      trend: 'up',
    },
    {
      title: 'Due Balance',
      value: 6000,
      prefix: 'Unpaid',
      trend: 'down',
    },
  ];

  return (
    <DashboardLayout>
      <Row gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <StatisticCard key={index} {...stat} />
        ))}
      </Row>

      <div style={{ marginTop: 24 }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card title="Recent Activity">{/* Add your recent activity content here */}</Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Quick Actions">{/* Add your quick actions content here */}</Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
}
