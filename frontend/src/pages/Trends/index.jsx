import React, { useState, useEffect } from 'react';
import {
  Button,
  Space,
  Card,
  Spin,
  Row,
  Col,
  List,
  Input,
  Typography,
  Image,
  Tag,
  Progress,
  Divider,
  Statistic,
  Modal,
  Timeline,
  Empty,
} from 'antd';
import {
  ReloadOutlined,
  LineChartOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  BookOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  RobotOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  FireOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import CrudLayout from '@/layout/CrudLayout';
import { request } from '@/request';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/solid';

const { Search } = Input;
const { Title, Text, Paragraph } = Typography;

const styles = {
  magicButton: {
    position: 'fixed',
    right: '40px',
    bottom: '40px',
    zIndex: 1000,
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'float 3s ease-in-out infinite',
  },
  buttonGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #1a1c1e, #2d3436)',
    borderRadius: '50%',
    filter: 'blur(8px)',
    animation: 'glow 3s linear infinite',
  },
  rainbowBorder: {
    position: 'absolute',
    inset: '-3px',
    background: 'linear-gradient(45deg, #00C6FF, #0072FF, #00C6FF, #0072FF)',
    borderRadius: '50%',
    animation: 'spin 4s linear infinite',
    opacity: 0.8,
    filter: 'blur(8px)',
  },
  innerButton: {
    position: 'relative',
    background: 'linear-gradient(45deg, #1a1c1e, #2d3436)',
    width: '90%',
    height: '90%',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    boxShadow: '0 8px 32px rgba(0, 114, 255, 0.3)',
  },
  sparkleIcon: {
    width: '32px',
    height: '32px',
    color: '#fff',
  },
};

const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes glow {
    0%, 100% { opacity: 0.8; transform: scale(1.1); }
    50% { opacity: 0.5; transform: scale(1); }
  }
`;

function Trends() {
  const [loading, setLoading] = useState(false);
  const [trendsData, setTrendsData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAiModalVisible, setIsAiModalVisible] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const fetchTrendsData = async (term) => {
    setLoading(true);
    try {
      const response = await request.post({
        entity: `trends?keyword=${term}`,
      });
      if (response.data) {
        setTrendsData(response.data);
      }
    } catch (error) {
      console.error('Error fetching trends:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    const response = await request.get({
      entity: 'admin/profile',
    });
    setSearchTerm(response.result.accountType);
  };

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await request.post({
        entity: `recommendations?accountType=${searchTerm}`,
      });

      const parsedData = JSON.parse(response.replace(/```json\n|\n```/g, ''));
      setRecommendations(parsedData);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendsData(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (isAiModalVisible) {
      fetchRecommendations();
    } else {
      setRecommendations(null);
    }
  }, [isAiModalVisible]);

  const handleSearch = (value) => {
    if (value) {
      setSearchTerm(value);
    }
  };

  const renderAIOverview = () => {
    if (!trendsData?.ai_overview) return null;

    return (
      <Card
        title={
          <Space>
            <InfoCircleOutlined />
            AI Overview
          </Space>
        }
        style={{ marginBottom: 24 }}
      >
        {trendsData?.ai_overview?.text_blocks?.map((block, index) => (
          <div key={index} style={{ marginBottom: 16 }}>
            {block.type === 'paragraph' && (
              <Paragraph>
                {block.snippet_highlighted_words ? (
                  <Text strong>{block.snippet_highlighted_words[0]}</Text>
                ) : (
                  block.snippet
                )}
              </Paragraph>
            )}
            {block.type === 'list' && (
              <List
                dataSource={block.list}
                renderItem={(item) => (
                  <List.Item>
                    <Text strong>{item.title}</Text>: {item.snippet}
                  </List.Item>
                )}
              />
            )}
          </div>
        ))}
      </Card>
    );
  };

  const renderAnswerBox = () => {
    if (!trendsData?.answer_box) return null;

    return (
      <Card title="Definition" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={4}>{trendsData.answer_box.syllables}</Title>
          <Text>{trendsData.answer_box.phonetic}</Text>
          <List
            dataSource={trendsData.answer_box.definitions}
            renderItem={(definition, index) => (
              <List.Item>
                <Text>
                  {index + 1}. {definition}
                </Text>
              </List.Item>
            )}
          />
          {trendsData.answer_box.examples && (
            <>
              <Divider>Examples</Divider>
              <List
                dataSource={trendsData.answer_box.examples}
                renderItem={(example) => (
                  <List.Item>
                    <Text italic>"{example}"</Text>
                  </List.Item>
                )}
              />
            </>
          )}
        </Space>
      </Card>
    );
  };

  const renderThingsToKnow = () => {
    if (!trendsData?.things_to_know?.buttons) return null;

    return (
      <Card
        title={
          <Space>
            <BookOutlined />
            Things to Know
          </Space>
        }
        style={{ marginBottom: 24 }}
      >
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={trendsData.things_to_know.buttons}
          renderItem={(item) => (
            <List.Item>
              <Card size="small" title={item.subtitle}>
                {item.web_links ? (
                  <List
                    size="small"
                    dataSource={item.web_links}
                    renderItem={(link) => (
                      <List.Item>
                        <List.Item.Meta title={link.title} description={link.snippet} />
                      </List.Item>
                    )}
                  />
                ) : (
                  <Text>{item.snippet}</Text>
                )}
              </Card>
            </List.Item>
          )}
        />
      </Card>
    );
  };

  const config = {
    entity: 'trend',
    header: {
      title: 'Search Trends Analysis',
      icon: <LineChartOutlined />,
    },
  };

  const renderAIButton = () => (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes glow {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.4; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={styles.magicButton}
        onClick={() => setIsAiModalVisible(true)}
      >
        <div style={styles.buttonGlow} />
        <div style={styles.rainbowBorder} />
        <div style={styles.innerButton}>
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <SparklesIcon style={styles.sparkleIcon} />
          </motion.div>
        </div>
      </motion.div>
    </>
  );

  const renderRecommendationSection = (title, items, icon) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        style={{
          marginBottom: 16,
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.05)',
        }}
        hoverable
      >
        <Row gutter={16} align="middle">
          <Col span={24}>
            <Title level={4} style={{ color: '#fff', marginBottom: 16 }}>
              {icon} {title}
            </Title>
            <List
              dataSource={items}
              renderItem={(item) => (
                <List.Item style={{ border: 'none', padding: '8px 0' }}>
                  <Text style={{ color: '#fff' }}>{item}</Text>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Card>
    </motion.div>
  );

  const renderAIModal = () => (
    <Modal
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            height: '60px',
            background: 'linear-gradient(45deg, #1a1c1e, #2d3436)',
            padding: '20px',
            margin: '-20px -24px 0px',
            borderRadius: '8px 8px 0 0',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              height: '60px',
              inset: '-50%',
              background:
                'conic-gradient(from 0deg, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee, #ff0000)',
              opacity: 0.15,
              animation: 'spin 4s linear infinite',
              filter: 'blur(35px)',
              transform: 'scale(2.5)',
            }}
          />
          <SparklesIcon style={{ fontSize: '24px', width: '24px', height: '24px', zIndex: 1 }} />
          <span style={{ fontSize: '20px', fontWeight: 'bold', zIndex: 1 }}>
            AI Magic Recommendations
          </span>
        </div>
      }
      visible={isAiModalVisible}
      onCancel={() => setIsAiModalVisible(false)}
      width={800}
      footer={null}
      style={{
        top: 0,
      }}
      centered
      className="ai-modal"
      maskStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
      }}
      bodyStyle={{
        background: 'linear-gradient(45deg, #1a1c1e, #2d3436)',
        color: 'white',
        padding: '24px',
        maxHeight: '80vh',
        overflow: 'auto',
      }}
    >
      {loading ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px',
            gap: '20px',
          }}
        >
          <div style={{ position: 'relative' }}>
            <Spin size="large" />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '100px',
                background:
                  'conic-gradient(from 0deg, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee, #ff0000)',
                borderRadius: '50%',
                animation: 'spin 4s linear infinite',
                filter: 'blur(15px)',
                opacity: 0.2,
              }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Text
              style={{ color: '#fff', fontSize: '16px', marginBottom: '8px', display: 'block' }}
            >
              Analyzing your business type...
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              Our AI is gathering insights and recommendations
            </Text>
          </div>
        </div>
      ) : recommendations ? (
        <div style={{ padding: '0 16px' }}>
          {renderRecommendationSection(
            'Core Technologies',
            recommendations.technology_recommendations.core_technologies,
            <RocketOutlined style={{ color: '#722ED1' }} />
          )}
          {renderRecommendationSection(
            'Emerging Technologies',
            recommendations.technology_recommendations.emerging_technologies,
            <ThunderboltOutlined style={{ color: '#13C2C2' }} />
          )}
          {renderRecommendationSection(
            'Implementation Strategy',
            recommendations.implementation_strategy.immediate_steps,
            <BulbOutlined style={{ color: '#FA8C16' }} />
          )}
          {renderRecommendationSection(
            'Growth Opportunities',
            recommendations.growth_opportunities.market_expansion,
            <FireOutlined style={{ color: '#F5222D' }} />
          )}
          {renderRecommendationSection(
            'Risk Assessment',
            recommendations.risk_assessment.technical_risks,
            <WarningOutlined style={{ color: '#FAAD14' }} />
          )}
          <Timeline mode="left" style={{ marginTop: 32, color: '#fff' }}>
            {Object.entries(recommendations.implementation_timeline).map(([phase, data]) => (
              <Timeline.Item
                key={phase}
                color="#722ED1"
                label={<Tag color="purple">{data.timeline}</Tag>}
              >
                <Card
                  size="small"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <List
                    size="small"
                    dataSource={data.tasks}
                    renderItem={(task) => (
                      <List.Item style={{ border: 'none', padding: '4px 0' }}>
                        <Text style={{ color: '#fff' }}>{task}</Text>
                      </List.Item>
                    )}
                  />
                </Card>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      ) : (
        <Empty
          description={<Text style={{ color: '#fff' }}>No recommendations available</Text>}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </Modal>
  );

  if (loading) {
    return (
      <CrudLayout config={config}>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </CrudLayout>
    );
  }

  return (
    <CrudLayout config={config}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Search
                placeholder="Search trends..."
                onSearch={handleSearch}
                style={{ width: 300 }}
                defaultValue={searchTerm}
                enterButton={<SearchOutlined />}
                allowClear
              />
              <Button icon={<ReloadOutlined />} onClick={() => fetchTrendsData(searchTerm)}>
                Refresh
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          {renderAIOverview()}
          {renderAnswerBox()}
          {renderThingsToKnow()}

          {trendsData?.knowledge_graph && (
            <Card title="Knowledge Graph" style={{ marginBottom: 24 }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={5}>{trendsData.knowledge_graph.title}</Title>
                {trendsData.knowledge_graph.header_images && (
                  <Space wrap>
                    {trendsData.knowledge_graph.header_images.map((img, index) => (
                      <Image
                        key={index}
                        src={img.image}
                        alt={`Knowledge graph ${index + 1}`}
                        width={150}
                        style={{ borderRadius: 8 }}
                      />
                    ))}
                  </Space>
                )}
              </Space>
            </Card>
          )}
        </Col>

        <Col xs={24} lg={8}>
          {trendsData?.related_questions && (
            <Card
              title={
                <Space>
                  <QuestionCircleOutlined />
                  Related Questions
                </Space>
              }
              style={{ marginBottom: 24 }}
            >
              <List
                dataSource={trendsData.related_questions}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.question}
                      description={
                        <>
                          {item.snippet && <Text>{item.snippet}</Text>}
                          {item.list && (
                            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                              {item.list.map((point, index) => (
                                <li key={index}>{point}</li>
                              ))}
                            </ul>
                          )}
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}

          {trendsData?.related_searches && (
            <Card
              title={
                <Space>
                  <GlobalOutlined />
                  Related Searches
                </Space>
              }
            >
              <Space size={[8, 16]} wrap>
                {trendsData.related_searches.map((item, index) => (
                  <Tag
                    key={index}
                    color="blue"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSearch(item.query)}
                  >
                    {item.query}
                  </Tag>
                ))}
              </Space>
            </Card>
          )}
        </Col>
      </Row>
      {renderAIButton()}
      {renderAIModal()}
    </CrudLayout>
  );
}

export default Trends;
