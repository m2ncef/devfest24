import React, { useState } from 'react';
import { Card, Table, Tag, Space } from 'antd';
import DefaultLayout from '@/layout/DefaultLayout';

const CompletedProjects = () => {
  const [projects] = useState([
    {
      id: '3',
      title: 'Brand Identity',
      client: 'Fashion Co',
      completedDate: '2024-03-01',
      rating: 5,
      status: 'completed',
    },
    {
      id: '4',
      title: 'Marketing Materials',
      client: 'Local Business',
      completedDate: '2024-02-15',
      rating: 4,
      status: 'completed',
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
      title: 'Completed Date',
      dataIndex: 'completedDate',
      key: 'completedDate',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => '⭐'.repeat(rating),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: () => <Tag color="success">Completed</Tag>,
    },
  ];

  return (
    <DefaultLayout>
      <div style={{ padding: '24px' }}>
        <Card title="Completed Projects">
          <Table columns={columns} dataSource={projects} rowKey="id" />
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default CompletedProjects;
