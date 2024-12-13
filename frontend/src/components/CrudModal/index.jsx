import React, { useEffect, useState } from 'react';
import { Modal, Typography, Space, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectDeletedItem } from '@/redux/crud/selectors';
import { valueByString } from '@/utils/helpers';

const { Text } = Typography;

export default function DeleteModal({ config, children, mockData }) {
  let {
    entity,
    entityDisplayLabels,
    deleteMessage = 'Do you want to delete:',
    modalTitle = 'Remove Item',
  } = config;

  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectDeletedItem);
  const { state, crudContextAction } = useCrudContext();
  const { isModalOpen } = state;
  const { modal } = crudContextAction;
  const [displayItem, setDisplayItem] = useState('');

  useEffect(() => {
    if (isSuccess) {
      modal.close();
      if (mockData) {
        // Handle mock data refresh
        console.log('Mock data delete success');
      } else {
        dispatch(crud.list({ entity }));
      }
    }

    if (current) {
      if (mockData) {
        // Handle mock data display
        const mockItem = mockData.find((item) => item._id === current._id);
        if (mockItem) {
          let labels = entityDisplayLabels.map((x) => valueByString(mockItem, x)).join(' ');
          setDisplayItem(labels);
        }
      } else {
        let labels = entityDisplayLabels.map((x) => valueByString(current, x)).join(' ');
        setDisplayItem(labels);
      }
    }
  }, [isSuccess, current, mockData]);

  const handleOk = () => {
    const id = current._id;
    if (mockData) {
      // Simulate delete for mock data
      setTimeout(() => {
        modal.close();
        console.log('Mock delete:', id);
      }, 1000);
    } else {
      dispatch(crud.delete({ entity, id }));
    }
  };

  const handleCancel = () => {
    if (!isLoading) modal.close();
  };

  return (
    <Modal
      title={<Text strong>{modalTitle}</Text>}
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
      okButtonProps={{
        danger: true,
        type: 'primary',
      }}
      centered
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Text>{deleteMessage}</Text>
        <Space>
          <Tag color="blue">{displayItem}</Tag>
        </Space>
        {children}
      </Space>
    </Modal>
  );
}
