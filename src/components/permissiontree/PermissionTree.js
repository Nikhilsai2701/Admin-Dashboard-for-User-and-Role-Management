import React, { useState } from 'react';
import { Tree, Button, Modal, Form, Input } from 'antd';
import './PermissionTree.css';

const treeData = [
  {
    title: 'Dashboard',
    key: '0-0',
    children: [
      { title: 'View Dashboard', key: '0-0-0' },
      { title: 'Edit Dashboard', key: '0-0-1' },
    ],
  },
  {
    title: 'User Management',
    key: '0-1',
    children: [
      { title: 'View Users', key: '0-1-0' },
      { title: 'Edit Users', key: '0-1-1' },
    ],
  },
];

const PermissionTree = () => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onExpand = (keys) => setExpandedKeys(keys);

  const expandAll = () => {
    const allKeys = treeData.flatMap((node) => node.key);
    setExpandedKeys(allKeys);
  };

  const collapseAll = () => setExpandedKeys([]);

  const showModal = () => setIsModalOpen(true);

  const handleOk = () => {
    form.validateFields().then(() => {
      setIsModalOpen(false);
      form.resetFields();
      alert('Permission Added Successfully!');
    });
  };

  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className="permission-tree-container">
      <div className="actions">
        <Button type="primary" onClick={expandAll}>
          Expand All
        </Button>
        <Button type="default" onClick={collapseAll} style={{ marginLeft: '10px' }}>
          Collapse All
        </Button>
        <Button type="dashed" onClick={showModal} style={{ marginLeft: '10px' }}>
          Add Permission
        </Button>
      </div>
      <Tree
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={onExpand}
        checkable
        style={{ marginTop: '20px' }}
      />
      <Modal
        title="Add New Permission"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="permissionName"
            label="Permission Name"
            rules={[{ required: true, message: 'Please input the permission name!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionTree;
