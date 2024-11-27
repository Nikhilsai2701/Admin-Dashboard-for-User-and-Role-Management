import React, { useState } from 'react';
import { Table, Button, Input, Select, Modal, Form, message } from 'antd';
import './UserManagement.css';

const { Search } = Input;
const { Option } = Select;

const UserManagement = () => {
  const [filter, setFilter] = useState('all');
  const [data, setData] = useState([
    { key: '1', userName: 'johndoe', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'Active', role: 'Manager' },
    { key: '2', userName: 'janesmith', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', status: 'Inactive', role: 'Analyst' },
    { key: '3', userName: 'samwilson', firstName: 'Sam', lastName: 'Wilson', email: 'sam.wilson@example.com', status: 'Active', role: 'Editor' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    { title: 'User Name', dataIndex: 'userName', key: 'userName' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Assign Role',
      key: 'assignRole',
      render: (_, record) => (
        <Select
          defaultValue={record.role}
          style={{ width: 150 }}
          onChange={(value) => handleRoleChange(value, record.key)}
        >
          <Option value="Manager">Manager</Option>
          <Option value="Analyst">Analyst</Option>
          <Option value="Editor">Editor</Option>
        </Select>
      ),
    },
    {
      title: 'Action',
      render: () => (
        <Button type="link" onClick={() => alert('Edit User')}>
          Edit
        </Button>
      ),
    },
  ];

  // Handle role change (update role in data)
  const handleRoleChange = (role, key) => {
    const updatedData = data.map((user) =>
      user.key === key ? { ...user, role } : user
    );
    setData(updatedData);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredData = filter === 'all' ? data : data.filter((user) => user.status.toLowerCase() === filter);

  // Show the modal to add a new user
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Handle form submission and add new user
  const handleAddUser = () => {
    form.validateFields().then((values) => {
      const newUser = {
        key: (data.length + 1).toString(),
        userName: values.userName,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        status: 'Active', // Default status for new user
        role: values.role,
      };
      setData([...data, newUser]);
      setIsModalOpen(false);
      form.resetFields();
      message.success('New user added successfully!');
    }).catch(errorInfo => {
      message.error('Please fill all required fields!');
    });
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="user-management-container">
      <div className="actions">
        <Button type="primary" onClick={showModal}>
          Add New User
        </Button>
        <div>
          <Search placeholder="Search users..." style={{ width: 200, marginRight: 10 }} />
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={handleFilterChange}
          >
            <Option value="all">All</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </div>
      </div>

      <Table dataSource={filteredData} columns={columns} rowKey="key" />

      {/* Modal for Adding New User */}
      <Modal
        title="Add New User"
        visible={isModalOpen}
        onOk={handleAddUser}
        onCancel={handleCancel}
        okText="Add User"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="add-user-form">
          <Form.Item
            name="userName"
            label="User Name"
            rules={[{ required: true, message: 'Please input the user name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please input the first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please input the last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email!', type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select defaultValue="Manager">
              <Option value="Manager">Manager</Option>
              <Option value="Analyst">Analyst</Option>
              <Option value="Editor">Editor</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
