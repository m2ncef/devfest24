import React, { useState } from 'react';
import { Card, Row, Col, Tag, Space, Typography, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import DefaultLayout from '@/layout/DefaultLayout';

const { Meta } = Card;
const { Title } = Typography;

const MyWorks = () => {
  const [works] = useState([
    {
      id: 1,
      title: 'E-commerce Website Design',
      category: 'Web Design',
      thumbnail: 'https://via.placeholder.com/300x200',
      date: '2024-03-15',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Brand Identity Package',
      category: 'Branding',
      thumbnail: 'https://via.placeholder.com/300x200',
      date: '2024-03-14',
      status: 'in_progress',
    },
  ]);

  const actionMenu = (
    <Menu>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete" danger>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <DefaultLayout>
      <div style={{ padding: '24px' }}>
        <Title level={2}>My Works</Title>
        <Row gutter={[16, 16]}>
          {works.map((work) => (
            <Col xs={24} sm={12} md={8} lg={6} key={work.id}>
              <Card
                cover={<img alt={work.title} src={work.thumbnail} />}
                actions={[
                  <Dropdown overlay={actionMenu} placement="bottomRight">
                    <EllipsisOutlined key="ellipsis" />
                  </Dropdown>,
                ]}
              >
                <Meta
                  title={work.title}
                  description={
                    <Space direction="vertical">
                      <Tag color="blue">{work.category}</Tag>
                      <span>{work.date}</span>
                      <Tag color={work.status === 'completed' ? 'green' : 'orange'}>
                        {work.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Tag>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default MyWorks;
