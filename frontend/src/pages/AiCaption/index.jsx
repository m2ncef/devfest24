import React, { useState, useEffect } from 'react';
import {
  Upload,
  Card,
  Button,
  Space,
  Typography,
  Table,
  Tag,
  Progress,
  Statistic,
  Row,
  Col,
  Spin,
  Modal,
  Timeline,
  Tooltip,
  Badge,
  Form,
  message,
} from 'antd';
import {
  CloudUploadOutlined,
  RobotOutlined,
  FireOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  StarOutlined,
  HeartOutlined,
  HistoryOutlined,
  DeleteOutlined,
  CopyOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/solid';
import CrudLayout from '@/layout/CrudLayout';
import { request } from '@/request';
import axios from 'axios';

const { Dragger } = Upload;
const { Title, Text, Paragraph } = Typography;

const styles = {
  magicButton: {
    position: 'relative',
    padding: '12px 24px',
    borderRadius: '12px',
    background: 'linear-gradient(45deg, #1a1c1e, #2d3436)',
    border: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  buttonGlow: {
    position: 'absolute',
    inset: '-2px',
    background: 'linear-gradient(45deg, #00C6FF, #0072FF, #00C6FF, #0072FF)',
    borderRadius: '12px',
    filter: 'blur(8px)',
    opacity: 0.8,
    animation: 'glow 3s linear infinite',
  },
};

function AiCaption() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [generationHistory, setGenerationHistory] = useState([]);
  const [stats, setStats] = useState({
    totalGenerations: 0,
    successRate: 0,
    averageTime: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Simulate loading stats
    setStats({
      totalGenerations: 1234,
      successRate: 98.5,
      averageTime: 2.3,
    });
  }, []);

  const columns = [
    {
      title: 'Image',
      key: 'image',
      render: (record) => (
        <img
          src={record.image}
          alt="Generated"
          style={{ width: 50, height: 50, cursor: 'pointer', objectFit: 'cover' }}
          onClick={() => {
            setSelectedImage(record.image);
            setShowModal(true);
          }}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <Space>
          <Text strong>{text}</Text>
          <Tooltip title="Copy title">
            <Button
              icon={<CopyOutlined />}
              size="small"
              onClick={() => navigator.clipboard.writeText(text)}
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Caption & Description',
      key: 'content',
      render: (_, record) => (
        <Space direction="vertical">
          <Text>{record.caption}</Text>
          <Text type="secondary" style={{ fontSize: '0.9em' }}>
            {record.description}
          </Text>
          <Space>
            <Tooltip title="Copy caption">
              <Button
                size="small"
                icon={<CopyOutlined />}
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${record.caption}\n\n${record.description}\n\n${record.hashtags
                      .map((tag) => `#${tag}`)
                      .join(' ')}`
                  )
                }
              >
                Copy All
              </Button>
            </Tooltip>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Hashtags',
      dataIndex: 'hashtags',
      key: 'hashtags',
      render: (tags) => (
        <Space wrap>
          {tags?.map((tag) => (
            <Tag
              color="blue"
              key={tag}
              style={{ cursor: 'pointer' }}
              onClick={() => navigator.clipboard.writeText(`#${tag}`)}
            >
              #{tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Tech Relevance',
      dataIndex: 'techRelevance',
      key: 'techRelevance',
      render: (text) => (
        <Text type="secondary" style={{ fontSize: '0.9em' }}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Generated At',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Regenerate">
            <Button
              icon={<ReloadOutlined />}
              size="small"
              //   onClick={() => generateCaption(record.originalFile)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
              onClick={() => {
                setGenerationHistory((prev) => prev.filter((item) => item.id !== record.id));
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    if (!fileList.length) {
      message.error('Please upload an image first!');
      return;
    }

    setGenerating(true);
    try {
      const formData = new FormData();
      const file = fileList[0].originFileObj;

      formData.append('image', file);

      const response = await axios.post('imageCaptionAndTags', formData);

      if (response.data.success) {
        // Clean up the response string and parse it
        const cleanedResponse = response.data.data.replace(/```json\n|\n```/g, '');
        const parsedData = JSON.parse(cleanedResponse);

        const newGeneration = {
          id: Date.now(),
          image: URL.createObjectURL(file),
          caption: parsedData.caption,
          title: parsedData.instagram_post.title,
          description: parsedData.instagram_post.description,
          hashtags: parsedData.instagram_post.hashtags,
          techRelevance: parsedData.tech_relevance,
          timestamp: new Date().toISOString(),
          originalFile: file,
        };

        setGenerationHistory((prev) => [newGeneration, ...prev]);
        setStats((prev) => ({
          ...prev,
          totalGenerations: prev.totalGenerations + 1,
          successRate:
            (prev.successRate * prev.totalGenerations + 100) / (prev.totalGenerations + 1),
        }));

        message.success('Content generated successfully!');
        form.resetFields();
        setFileList([]);
      } else {
        message.error(response.data.message || 'Failed to generate content. Please try again.');
      }
    } catch (error) {
      console.error('Generation failed:', error);
      message.error('Failed to generate content. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const uploadProps = {
    name: 'image',
    multiple: false,
    fileList,
    accept: '.jpg,.jpeg,.png,.gif,.webp', // Specify accepted file types
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      const isPSD =
        file.type === 'image/vnd.adobe.photoshop' || file.name.toLowerCase().endsWith('.psd');

      if (isPSD) {
        message.error('PSD files are not supported. Please upload a JPG, PNG, or WEBP image.');
        return false;
      }

      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
        return false;
      }

      return false; // Return false to prevent auto upload
    },
    onChange: handleUpload,
    onRemove: () => {
      setFileList([]);
    },
  };

  const config = {
    entity: 'ai-caption',
    header: {
      title: 'AI Caption Generator',
      icon: <RobotOutlined />,
    },
  };

  return (
    <CrudLayout config={config}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={8}>
                <Card className="stats-card">
                  <Statistic
                    title="Total Generations"
                    value={stats.totalGenerations}
                    prefix={<TrophyOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card className="stats-card">
                  <Statistic
                    title="Success Rate"
                    value={stats.successRate}
                    suffix="%"
                    prefix={<StarOutlined />}
                    valueStyle={{ color: '#cf1322' }}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card className="stats-card">
                  <Statistic
                    title="Average Generation Time"
                    value={stats.averageTime}
                    suffix="s"
                    prefix={<ThunderboltOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card
            title={
              <Space>
                <CloudUploadOutlined />
                <span>Upload Image</span>
              </Space>
            }
            extra={<Text type="secondary">Supported formats: JPG, PNG, WEBP (Max: 5MB)</Text>}
          >
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                name="image"
                rules={[{ required: true, message: 'Please upload an image!' }]}
              >
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <CloudUploadOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                  </p>
                  <p className="ant-upload-text">Click or drag image to upload</p>
                  <p className="ant-upload-hint">Support for JPG, PNG, WEBP images up to 5MB</p>
                </Dragger>
              </Form.Item>

              <Form.Item style={{ textAlign: 'center', marginTop: 24 }}>
                <motion.button
                  type="submit"
                  style={styles.magicButton}
                  disabled={!fileList.length || generating}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div style={styles.buttonGlow} />
                  <Space>
                    <SparklesIcon style={{ width: 20, height: 20, color: '#fff' }} />
                    <Text style={{ color: '#fff', margin: 0 }}>
                      {generating ? 'Generating Magic...' : 'Generate Magic Content'}
                    </Text>
                    {generating && <Spin size="small" />}
                  </Space>
                </motion.button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Generation Timeline" className="timeline-card">
            <Timeline mode="left">
              {generationHistory.slice(0, 5).map((item) => (
                <Timeline.Item
                  key={item.id}
                  color="blue"
                  label={new Date(item.timestamp).toLocaleTimeString()}
                >
                  Generated caption for image
                  <br />
                  <Tag color="green">{item.hashtags.length} hashtags</Tag>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Generation History">
            <Table columns={columns} dataSource={generationHistory} rowKey="id" />
          </Card>
        </Col>
      </Row>

      <Modal visible={showModal} onCancel={() => setShowModal(false)} footer={null} width={800}>
        <img src={selectedImage} alt="Preview" style={{ width: '100%', height: 'auto' }} />
      </Modal>

      <style jsx>{`
        .stats-card {
          text-align: center;
          transition: all 0.3s ease;
        }
        .stats-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .timeline-card {
          height: 100%;
          overflow-y: auto;
        }
        @keyframes glow {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </CrudLayout>
  );
}

export default AiCaption;
