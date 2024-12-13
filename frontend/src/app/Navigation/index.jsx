import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';

import { useAppContext } from '@/context/appContext';
import logoIcon from '@/style/images/logo-icon.png';
import logoText from '@/style/images/logo-text.png';

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
  BankOutlined,
  LineChartOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

export default function Navigation() {
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const location = useLocation();

  // Get current selected key based on path
  const getSelectedKey = (pathname) => {
    const path = pathname.split('/')[1];
    switch (path) {
      case '':
        return 'Dashboard';
      case 'trends':
        return 'Trends';
      case 'customer':
        return 'Customer';
      case 'invoice':
        return 'Invoice';
      case 'quote':
        return 'Quote';
      case 'payment':
        if (pathname.includes('invoice')) return 'PaymentInvoice';
        if (pathname.includes('mode')) return 'PaymentMode';
        return '';
      case 'employee':
        return 'Employee';
      case 'admin':
        return 'Admin';
      case 'settings':
        return 'SettingsPage';
      case 'role':
        return 'Role';
      default:
        return '';
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

  const selectedKey = getSelectedKey(location.pathname);
  const openKeys = location.pathname.includes('/settings') ? ['Settings'] : [];

  return (
    <>
      <Sider collapsible collapsed={isNavMenuClose} onCollapse={onCollapse} className="navigation">
        <div className="logo">{!showLogoApp && <Title level={2}>DevFest24</Title>}</div>
        <Menu mode="inline" selectedKeys={[selectedKey]} defaultOpenKeys={openKeys}>
          <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>
            <Link to="/" />
            Dashboard
          </Menu.Item>
          <Menu.Item key="Trends" icon={<LineChartOutlined />}>
            <Link to="/trends" />
            Trends
          </Menu.Item>
          <Menu.Item key="Customer" icon={<CustomerServiceOutlined />}>
            <Link to="/customer" />
            Customer
          </Menu.Item>
          <Menu.Item key="Invoice" icon={<FileTextOutlined />}>
            <Link to="/invoice" />
            Invoice
          </Menu.Item>
          <Menu.Item key="Quote" icon={<FileSyncOutlined />}>
            <Link to="/quote" />
            Quote
          </Menu.Item>
          <Menu.Item key="PaymentInvoice" icon={<CreditCardOutlined />}>
            <Link to="/payment/invoice" />
            Payment Invoice
          </Menu.Item>
          <Menu.Item key="Employee" icon={<UserOutlined />}>
            <Link to="/employee" />
            Employee
          </Menu.Item>
          <Menu.Item key="Admin" icon={<TeamOutlined />}>
            <Link to="/admin" />
            Admin
          </Menu.Item>
          <SubMenu key="Settings" icon={<SettingOutlined />} title="Settings">
            <Menu.Item key="SettingsPage">
              <Link to="/settings" />
              General Settings
            </Menu.Item>
            <Menu.Item key="PaymentMode">
              <Link to="/payment/mode" />
              Payment Mode
            </Menu.Item>
            <Menu.Item key="Role">
              <Link to="/role" />
              Role
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </>
  );
}
