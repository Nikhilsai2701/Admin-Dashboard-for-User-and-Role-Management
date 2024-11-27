import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (values) => {
    setLoading(true);
    setError('');
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      if (values.username === 'admin' && values.password === 'password') {
        window.location.href = '/dashboard';
      } else {
        setError('Invalid username or password');
      }
    }, 1000);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title">Login</h2>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '15px' }} />}
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-button" loading={loading}>
            Log In
          </Button>
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
