import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Menu, Dropdown, Button, Space, Statistic } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  MailOutlined,
  LogoutOutlined,
  BellOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import photo from '@/style/images/photo.png';
import { logout } from '@/redux/auth/actions';
import history from '@/utils/history';
import uniqueId from '@/utils/uinqueId';
import { request } from '@/request';

export default function HeaderContent() {
  const dispatch = useDispatch();
  const { SubMenu } = Menu;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { result, success } = await request.get({ entity: 'admin/profile' });
        if (success) {
          setUserData(result);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const profileDropdown = (
    <div className="profileDropdown whiteBox shadow" style={{ minWidth: '200px' }}>
      <div className="pad15">
        <Avatar
          size="large"
          className="last"
          src={userData?.photo ? '/' + userData.photo : photo}
          style={{ float: 'left' }}
        />
        <div className="info">
          <p className="strong">
            {userData ? `${userData.name} ${userData.surname}` : 'Loading...'}
          </p>
          <p>{userData?.email || 'Loading...'}</p>
        </div>
      </div>
      <div className="line"></div>
      <div>
        <Menu>
          <Menu.Item
            icon={<WalletOutlined />}
            key={`${uniqueId()}`}
            onClick={() => history.push('/credit')}
          >
            Recharge Credit
          </Menu.Item>
          <Menu.Item
            icon={<LogoutOutlined />}
            key={`${uniqueId()}`}
            onClick={() => history.push('/logout')}
          >
            logout
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );

  const creditButton = (
    <Button
      type="text"
      onClick={() => history.push('/credit')}
      style={{
        height: '50px',
        padding: '0 15px',
        borderRadius: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s ease',
      }}
      className="credit-button-hover"
    >
      <Space>
        <WalletOutlined style={{ fontSize: '20px', color: '#52c41a' }} />
        <Statistic
          value={userData?.credit || 0}
          suffix="DZD"
          valueStyle={{
            fontSize: '16px',
            color: '#52c41a',
            fontWeight: 'bold',
          }}
          prefix={<small style={{ fontSize: '12px', color: '#8c8c8c' }}>Balance:</small>}
        />
      </Space>
    </Button>
  );

  return (
    <div
      className="headerIcon"
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: '99',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 30px',
      }}
    >
      <Space size={20} align="center">
        {creditButton}
        <Dropdown overlay={profileDropdown} trigger={['click']} placement="bottomRight">
          <Avatar
            style={{
              cursor: 'pointer',
              border: '2px solid #f0f0f0',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
            }}
            className="avatar-hover"
            size={45}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Space>
    </div>
  );
}
