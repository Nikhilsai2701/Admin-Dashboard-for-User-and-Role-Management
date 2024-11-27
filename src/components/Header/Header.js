import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const AppHeader = () => (
  <Header className="dashboard-header">
    <h1 style={{ color: '#fff', textAlign: 'center', margin: 0 }}>RBAC Admin Dashboard</h1>
  </Header>
);

export default AppHeader;
