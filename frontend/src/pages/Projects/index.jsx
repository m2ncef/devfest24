import React, { useState } from 'react';
import { Tabs, Card, Table, Tag, Space, Button } from 'antd';
import DefaultLayout from '@/layout/DefaultLayout';

const { TabPane } = Tabs;

const Projects = () => {
  const [projects] = useState([
    {
      id: '1',
      title: 'Website Redesign',
      client: 'Tech Corp',
      deadline: '2024-04-01',
      status: 'active',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Logo Design',
      client: 'Fashion Brand',
      deadline: '2024-03-25',
      status: 'completed',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Mobile App UI',
      client: 'Startup Inc',
      deadline: '2024-03-20',
      status: 'archived',
      priority: 'low',
    },
    // Add more projects as needed
  ]);

  const columns = [
    {
      title: 'Project Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'green'}>
          {priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">View Details</Button>
          <Button type="link">Update Status</Button>
        </Space>
      ),
    },
  ];

  const filterProjects = (status) => projects.filter((project) => project.status === status);

  return (
    <DefaultLayout>
      <div style={{ padding: '24px' }}>
        <Card>
          <Tabs defaultActiveKey="active">
            <TabPane tab="Active Projects" key="active">
              <Table columns={columns} dataSource={filterProjects('active')} rowKey="id" />
            </TabPane>
            <TabPane tab="Completed Projects" key="completed">
              <Table columns={columns} dataSource={filterProjects('completed')} rowKey="id" />
            </TabPane>
            <TabPane tab="Archived Projects" key="archived">
              <Table columns={columns} dataSource={filterProjects('archived')} rowKey="id" />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default Projects;
