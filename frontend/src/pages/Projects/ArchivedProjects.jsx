import React, { useState } from 'react';
import { Card, Table, Tag, Space } from 'antd';
import DefaultLayout from '@/layout/DefaultLayout';

const ArchivedProjects = () => {
  const [projects] = useState([
    {
      id: '5',
      title: 'Old Website',
      client: 'Previous Client',
      archivedDate: '2023-12-01',
      reason: 'Project Completed',
      status: 'archived',
    },
    {
      id: '6',
      title: 'Logo Design',
      client: 'Past Business',
      archivedDate: '2023-11-15',
      reason: 'Client Inactive',
      status: 'archived',
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
      title: 'Archived Date',
      dataIndex: 'archivedDate',
      key: 'archivedDate',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: () => <Tag color="default">Archived</Tag>,
    },
  ];

  return (
    <DefaultLayout>
      <div style={{ padding: '24px' }}>
        <Card title="Archived Projects">
          <Table columns={columns} dataSource={projects} rowKey="id" />
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default ArchivedProjects;
