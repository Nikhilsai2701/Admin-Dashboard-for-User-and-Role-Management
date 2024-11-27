import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, KeyOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <Menu
    mode="inline"
    theme="dark"
    style={{ height: '100%' }}
    defaultSelectedKeys={['1']}
  >
    <Menu.Item key="1" icon={<UserOutlined />}>
      <Link to="/users">User Management</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<KeyOutlined />}>
      <Link to="/roles">Role Management</Link>
    </Menu.Item>
    <Menu.Item key="3" icon={<SettingOutlined />}>
      <Link to="/permissions">Permission Management</Link>
    </Menu.Item>
  </Menu>
);

export default Sidebar;
