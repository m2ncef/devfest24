import React from 'react';
import { Layout, Row, Col } from 'antd';
export default function AuthLayout({ children }) {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 13, order: 2 }}
          lg={{ span: 12, order: 2 }}
          style={{ minHeight: '100vh' }}
        >
          {children}
        </Col>
      </Row>
    </Layout>
  );
}
