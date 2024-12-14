import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Select, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const UploadModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleSubmit = (values) => {
    console.log('Submitted values:', { ...values, files: fileList });
    message.success('Work uploaded successfully');
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    fileList,
    beforeUpload: (file) => {
      setFileList((prev) => [...prev, file]);
      return false;
    },
    onRemove: (file) => {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
  };

  return (
    <Modal title="Upload New Work" visible={visible} onCancel={onCancel} footer={null} width={800}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Project Title" rules={[{ required: true }]}>
          <Input placeholder="Enter project title" />
        </Form.Item>

        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select placeholder="Select category">
            <Option value="web">Web Design</Option>
            <Option value="graphic">Graphic Design</Option>
            <Option value="ui">UI/UX Design</Option>
            <Option value="branding">Branding</Option>
          </Select>
        </Form.Item>

        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <TextArea rows={4} placeholder="Describe your work" />
        </Form.Item>

        <Form.Item label="Upload Files" rules={[{ required: true }]}>
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag files to upload</p>
            <p className="ant-upload-hint">Support for images, videos, and documents</p>
          </Dragger>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Upload Work
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadModal;
