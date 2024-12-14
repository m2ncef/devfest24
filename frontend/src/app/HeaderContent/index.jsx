import React, { useState, useEffect } from 'react';
import { Avatar, Button, Dropdown, Layout, Menu, Space, Typography, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, WalletOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/auth/actions';
import { request } from '@/request';

const { Header } = Layout;
const { Text } = Typography;

export default function HeaderContent() {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { result, success } = await request.get({ entity: 'admin/profile' });
      if (success) {
        setUserData(result);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Text strong>
          {userData?.name} {userData?.surname}
        </Text>
      </Menu.Item>

      <Menu.Item key="credit" icon={<WalletOutlined />}>
        <Link to="/credit">
          <Text>Credits: {userData?.credit ?? 0}</Text>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    >
      <div style={{ float: 'right', padding: '0 24px' }}>
        <Space size="large" align="center">
          {userData?.role !== 'superadmin' && (
            <Link to="/credit">
              <Button
                type="default"
                icon={<WalletOutlined />}
                className="credit-button-hover"
                style={{
                  height: '40px',
                  borderRadius: '20px',
                  background: '#f6f8fa',
                  border: '1px solid #e1e4e8',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Badge
                  count={userData?.credit ?? 0}
                  style={{
                    backgroundColor: '#52c41a',
                    boxShadow: '0 2px 6px rgba(82,196,26,0.4)',
                  }}
                  overflowCount={9999}
                  showZero={true}
                ></Badge>
                <Text strong style={{ marginRight: '8px' }}>
                  Credits
                </Text>
              </Button>
            </Link>
          )}

          <Dropdown overlay={userMenu} trigger={['click']}>
            <Space className="user-dropdown" style={{ cursor: 'pointer' }}>
              <Avatar
                style={{
                  backgroundColor: '#1890ff',
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                className="avatar-hover"
                size="large"
              >
                {userData?.name?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Space direction="vertical" size={0}>
                <Text
                  strong
                  style={{
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {userData?.email}
                </Text>
              </Space>
            </Space>
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
}
