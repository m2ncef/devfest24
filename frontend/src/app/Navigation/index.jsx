import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Layout, Menu, Typography, Button } from 'antd';
import { useSelector } from 'react-redux';
import { request } from '@/request';

import { useAppContext } from '@/context/appContext';
import {
  DesktopOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CreditCardOutlined,
  ShopOutlined,
  PictureOutlined,
  UploadOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
  AppstoreOutlined,
  FolderOutlined,
  StarOutlined,
  ProjectOutlined,
  LineChartOutlined,
  CheckCircleOutlined,
  CameraOutlined,
  RobotOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

export default function Navigation() {
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu, setIsUploadModalVisible } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const location = useLocation();
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
    if (userData?.role === 'superadmin') {
      window.location.href = '/admin';
    }

    fetchUserProfile();
  }, []);

  const renderEcommerceMenu = () => (
    <>
      <SubMenu key="ecommerce" icon={<ShopOutlined />} title="E-commerce">
        <Menu.Item key="products" icon={<AppstoreOutlined />}>
          <Link to="/products" />
          Products
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
          <Link to="/orders" />
          Orders
        </Menu.Item>
        <Menu.Item key="inventory" icon={<GiftOutlined />}>
          <Link to="/inventory" />
          Inventory
        </Menu.Item>
      </SubMenu>
    </>
  );

  const renderDesignerMenu = () => (
    <>
      <SubMenu key="portfolio" icon={<FolderOutlined />} title="Portfolio">
        <Menu.Item key="my-works" icon={<PictureOutlined />}>
          <Link to="/my-works" />
          My Works
        </Menu.Item>
        <Menu.Item key="upload-work" icon={<UploadOutlined />}>
          <Link to="/upload-work" />
          Upload Work
        </Menu.Item>
      </SubMenu>
      <SubMenu key="projects" icon={<ProjectOutlined />} title="Projects">
        <Menu.Item key="active-projects" icon={<ProfileOutlined />}>
          <Link to="/active-projects" />
          Active Projects
        </Menu.Item>
        <Menu.Item key="completed-projects" icon={<CheckCircleOutlined />}>
          <Link to="/completed-projects" />
          Completed
        </Menu.Item>
        <Menu.Item key="archived-projects" icon={<FolderOutlined />}>
          <Link to="/archived-projects" />
          Archived
        </Menu.Item>
      </SubMenu>
    </>
  );

  const renderDefaultMenu = () => (
    <>
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/" />
        Dashboard
      </Menu.Item>
      <Menu.Item key="customer" icon={<CustomerServiceOutlined />}>
        <Link to="/customer" />
        Customer
      </Menu.Item>
      <Menu.Item key="invoice" icon={<FileTextOutlined />}>
        <Link to="/invoice" />
        Invoice
      </Menu.Item>
      <Menu.Item key="quote" icon={<FileSyncOutlined />}>
        <Link to="/quote" />
        Quote
      </Menu.Item>
      <Menu.Item key="employee" icon={<UserOutlined />}>
        <Link to="/employee" />
        Employee
      </Menu.Item>
      <Menu.Item key="trends" icon={<LineChartOutlined />}>
        <Link to="/trends" />
        Trends
      </Menu.Item>
      <Menu.Item key="ai-caption" icon={<CameraOutlined />}>
        <Link to="/ai-caption" />
        AI Caption Generator
      </Menu.Item>
    </>
  );

  const renderMenuItems = () => {
    if (userData?.role === 'superadmin') {
      return (
        <Menu.Item key="Admin" icon={<TeamOutlined />}>
          <Link to="/admin" />
          Admin
        </Menu.Item>
      );
    }

    if (userData?.accountType === 'ecommerce') {
      return renderEcommerceMenu();
    }

    if (userData?.accountType === 'designer') {
      return renderDesignerMenu();
    }
  };

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);

  const onCollapse = () => {
    navMenu.collapse();
  };

  const selectedKey = location.pathname.split('/')[1] || 'dashboard';
  const openKeys = location.pathname.includes('/settings')
    ? ['Settings']
    : location.pathname.includes('/products') ||
      location.pathname.includes('/orders') ||
      location.pathname.includes('/inventory')
    ? ['ecommerce']
    : location.pathname.includes('/upload-work') ||
      location.pathname.includes('/my-works') ||
      location.pathname.includes('/featured-works')
    ? ['portfolio']
    : location.pathname.includes('/active-projects') ||
      location.pathname.includes('/completed-projects') ||
      location.pathname.includes('/archived-projects')
    ? ['projects']
    : [];

  return (
    <>
      <Sider collapsible collapsed={isNavMenuClose} onCollapse={onCollapse} className="navigation">
        <div className="logo">
          {!showLogoApp && (
            <>
              <Title
                level={1}
                style={{
                  background: 'linear-gradient(45deg, #8B5CF6, #1F2937)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                B-UP
              </Title>
              {userData && (
                <div style={{ padding: '0 24px', color: '#fff', fontSize: '12px' }}>
                  {userData.email}
                </div>
              )}
            </>
          )}
        </div>
        <Menu mode="inline" selectedKeys={[selectedKey]} defaultOpenKeys={openKeys}>
          {userData?.role !== 'superadmin' && renderDefaultMenu()}
          {renderMenuItems()}
        </Menu>
      </Sider>
    </>
  );
}
