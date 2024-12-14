import React, { useState } from 'react';
import { Card, Table, Tag, Space } from 'antd';
import DefaultLayout from '@/layout/DefaultLayout';

const ActiveProjects = () => {
  const [projects] = useState([
    {
      id: '1',
      title: 'Website Redesign',
      client: 'Tech Corp',
      deadline: '2024-04-01',
      priority: 'high',
      status: 'in_progress',
    },
    {
      id: '2',
      title: 'Mobile App UI',
      client: 'StartUp Inc',
      deadline: '2024-04-15',
      priority: 'medium',
      status: 'in_progress',
    },
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'in_progress' ? 'processing' : 'success'}>
          {status === 'in_progress' ? 'In Progress' : 'Completed'}
        </Tag>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div style={{ padding: '24px' }}>
        <Card title="Active Projects">
          <Table columns={columns} dataSource={projects} rowKey="id" />
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default ActiveProjects;
