import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Menu, Dropdown } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  MailOutlined,
  LogoutOutlined,
  BellOutlined,
  UserOutlined,
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

  return (
    <div className="headerIcon" style={{ position: 'absolute', right: 0, zIndex: '99' }}>
      <Dropdown overlay={profileDropdown} trigger={['click']} placement="bottomRight">
        <Avatar
          style={{ cursor: 'pointer', border: '2px solid #808080' }}
          className="last"
          size="large"
          icon={<UserOutlined />}
        />
      </Dropdown>
    </div>
  );
}
