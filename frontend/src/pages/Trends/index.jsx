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
} from 'antd';
import {
  ReloadOutlined,
  LineChartOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  BookOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import CrudLayout from '@/layout/CrudLayout';
import { request } from '@/request';

const { Search } = Input;
const { Title, Text, Paragraph } = Typography;

function Trends() {
  const [loading, setLoading] = useState(false);
  const [trendsData, setTrendsData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('Technology');

  const fetchTrendsData = async (term) => {
    setLoading(true);
    try {
      const response = await request.post({
        entity: `trends`,
        params: { keyword: term },
      });
      if (response.data) {
        setTrendsData(response.data);
        console.log('Processed Trends Data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching trends:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendsData(searchTerm);
  }, [searchTerm]);

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
        {trendsData.ai_overview.text_blocks.map((block, index) => (
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
    </CrudLayout>
  );
}

export default Trends;
