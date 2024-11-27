import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, Space, Tag, Checkbox } from 'antd'; // Removed Select import
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './RoleManagement.css';

const RoleManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null); // To hold the role being edited
  const [data, setData] = useState([
    { key: '1', roleName: 'Admin', description: 'Full access to all features', enLearning: true, access: ['Violations', 'Violators', 'Threats'] },
    { key: '2', roleName: 'Analyst', description: 'Can analyze data and view reports', enLearning: false, access: ['Violations', 'Threats'] },
    { key: '3', roleName: 'Editor', description: 'Can edit content and manage users', enLearning: true, access: ['Violators'] },
  ]);

  const [form] = Form.useForm();

  // Define the columns for the table
  const columns = [
    { title: 'Role Name', dataIndex: 'roleName', key: 'roleName' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { 
      title: 'Enabling Learning', 
      dataIndex: 'enLearning', 
      key: 'enLearning', 
      render: (enLearning) => (
        <Tag color={enLearning ? 'green' : 'red'}>{enLearning ? 'Enabled' : 'Disabled'}</Tag>
      )
    },
    { 
      title: 'Access', 
      dataIndex: 'access', 
      key: 'access', 
      render: (access) => access.map((section) => <Tag color="blue" key={section}>{section}</Tag>)
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)} 
            type="link"
          />
          <Popconfirm 
            title="Are you sure you want to delete this role?" 
            onConfirm={() => handleDelete(record.key)}
          >
            <Button 
              icon={<DeleteOutlined />} 
              type="link" 
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Show modal for editing role
  const handleEdit = (role) => {
    setEditingRole(role);
    form.setFieldsValue(role); // Pre-fill the form with role data
    setIsModalOpen(true);
  };

  // Submit the form to add/edit the role
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingRole) {
        // Update existing role
        const updatedData = data.map((role) =>
          role.key === editingRole.key ? { ...role, ...values } : role
        );
        setData(updatedData);
        alert('Role updated successfully!');
      } else {
        // Add new role
        const newRole = { key: (data.length + 1).toString(), ...values };
        setData([...data, newRole]);
        alert('Role added successfully!');
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingRole(null); // Reset editingRole
    });
  };

  // Delete role
  const handleDelete = (key) => {
    const updatedData = data.filter((role) => role.key !== key);
    setData(updatedData);
    alert('Role deleted successfully!');
  };

  return (
    <div className="role-management-container">
      <div className="header">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add New Role
        </Button>
      </div>

      {/* Table displaying roles */}
      <Table dataSource={data} columns={columns} rowKey="key" />

      {/* Modal for adding/editing a role */}
      <Modal
        title={editingRole ? 'Edit Role' : 'Add New Role'}
        visible={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingRole(null);
          form.resetFields();
        }}
        okText={editingRole ? 'Update Role' : 'Add Role'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="roleName"
            label="Role Name"
            rules={[{ required: true, message: 'Please input the role name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input a description for the role!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="enLearning"
            label="Enabling Learning"
            valuePropName="checked"
            rules={[{ required: true, message: 'Please specify if Learning is enabled!' }]}
          >
            <Input.Checkbox>Enable Learning</Input.Checkbox>
          </Form.Item>

          <Form.Item
            name="access"
            label="Access"
            rules={[{ required: true, message: 'Please select at least one section!' }]}
          >
            <CustomSelect
              selectedAccess={form.getFieldValue('access') || []}
              onChange={(selectedAccess) => form.setFieldsValue({ access: selectedAccess })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// Custom Select component to handle multiple section selections
const CustomSelect = ({ selectedAccess, onChange }) => {
  const sections = ['Violations', 'Violators', 'Threats']; // Available sections

  const handleCheckboxChange = (event) => {
    const section = event.target.value;
    const newAccess = selectedAccess.includes(section)
      ? selectedAccess.filter((item) => item !== section)
      : [...selectedAccess, section];
    onChange(newAccess);
  };

  return (
    <div className="custom-select-container">
      {sections.map((section) => (
        <Checkbox
          key={section}
          value={section}
          checked={selectedAccess.includes(section)}
          onChange={handleCheckboxChange}
        >
          {section}
        </Checkbox>
      ))}
    </div>
  );
};

export default RoleManagement;
