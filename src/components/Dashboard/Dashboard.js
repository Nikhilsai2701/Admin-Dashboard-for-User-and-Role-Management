import React from 'react';
import { Layout, Menu, Card, Row, Col } from 'antd';
import { UserOutlined, FileProtectOutlined, WarningOutlined, SecurityScanOutlined } from '@ant-design/icons';
import './Dashboard.css';

const { Sider, Content } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar (Vertical Menu) */}
      <Sider width={250} className="sidebar">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<UserOutlined />} onClick={() => window.location.href = '/users'}>
            Manage Users
          </Menu.Item>
          <Menu.Item key="2" icon={<FileProtectOutlined />} onClick={() => window.location.href = '/roles'}>
            Manage Roles
          </Menu.Item>
          <Menu.Item key="3" icon={<WarningOutlined />} onClick={() => window.location.href = '/violations'}>
            Violations
          </Menu.Item>
          <Menu.Item key="4" icon={<WarningOutlined />} onClick={() => window.location.href = '/violators'}>
            Violators
          </Menu.Item>
          <Menu.Item key="5" icon={<SecurityScanOutlined />} onClick={() => window.location.href = '/threats'}>
            Threats
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content Area */}
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content style={{ padding: '24px', margin: 0, minHeight: 280 }}>
          {/* Centered Welcome Message */}
          <div className="welcome-message">
            <h1>Welcome to Dashboard</h1>
            <p>Admin, manage users, roles, violations, and more from here.</p>
          </div>

          {/* Quick Links Section */}
          <div className="quick-links">
            <h3>Quick Links</h3>
            <Row gutter={16}>
              <Col span={8}>
                <Card hoverable className="quick-link-card" onClick={() => window.location.href = '/users'}>
                  Manage Users
                </Card>
              </Col>
              <Col span={8}>
                <Card hoverable className="quick-link-card" onClick={() => window.location.href = '/roles'}>
                  Manage Roles
                </Card>
              </Col>
              <Col span={8}>
                <Card hoverable className="quick-link-card" onClick={() => window.location.href = '/violations'}>
                  Violations
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
