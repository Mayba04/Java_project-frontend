import React, { useState } from 'react';
import { Button, Form, Input, Select, message, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/index.ts';
import { register } from '../../store/accounts/accounts.actions.ts';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNotification } from '../../hooks/notification/index.ts';
import { Status } from '../../utils/enums/index.ts';
import { IRegistration } from '../../interfaces/account/index.ts';

const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const { handleError } = useNotification(messageApi);
    const status = useAppSelector(state => state.account.status);

    const [selectedRole, setSelectedRole] = useState<number>(1); // Початкове значення ролі

    const onFinish = async (values: IRegistration) => {
        try {
            const registrationData = { ...values, roleId: selectedRole };
            const response = await dispatch(register(registrationData));
            unwrapResult(response);
            message.success('Registration successful!');
            navigate('/');
            
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Spin tip="Loading" size="large" spinning={status === Status.LOADING}>
            {contextHolder}
            <div style={{ width: 400, margin: 'auto', marginTop: 50 }}>
                <h2>Registration Form</h2>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
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
                    <Form.Item
                        label="Role"
                        name="role"
                        initialValue={1} // Початкове значення ролі
                        rules={[{ required: true, message: 'Please select a role!' }]}
                    >
                        <Select onChange={(value: number) => setSelectedRole(value)}>
                            <Select.Option value={1}>User</Select.Option>
                            <Select.Option value={2}>Admin</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <p style={{ textAlign: 'center' }}>
                    Already have an account? <Link to="/login">Login now!</Link>
                </p>
            </div>
        </Spin>
    );
};

export default RegistrationPage;
