import React from 'react';
import {Button, Image, Divider, Flex, Form, Input, Row, Typography, message, Spin} from 'antd';
import logo from '../../assets/login.png';
import {ILogin} from '../../interfaces/account/index.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/redux/index.ts';
import {login} from '../../store/accounts/accounts.actions.ts';
import {Link, useNavigate} from 'react-router-dom';
import {unwrapResult} from '@reduxjs/toolkit';
import {useNotification} from '../../hooks/notification/index.ts';
import {Status} from '../../utils/enums/index.ts';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
    email: string;
    name: string;
    roles: string[];
    // інші кастомні поля...
}
const Login : React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const {handleError} = useNotification(messageApi);
    const status = useAppSelector(state => state.account.status);

    
    const onFinish = async (values: ILogin) => {
        try {
            const response = await dispatch(login(values));
            const result = unwrapResult(response);
    
            // Використовуйте type assertion тут, щоб TypeScript розумів ваш кастомний тип
            const decodedToken = jwtDecode<CustomJwtPayload>(result.token);
    
            // Тепер ви можете безпечно звертатися до decodedToken.roles
            if (decodedToken.roles.includes("admin")) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Spin  tip="Loading" size="large" spinning={status === Status.LOADING}>
            <Row gutter={16}>
                {contextHolder}
                <Divider orientation="left">Вхід</Divider>
                <Flex vertical style={{width: '100%'}} align="center" justify="center">

                    <Image
                        preview={false}
                        width={200}
                        src={logo}
                        style={{marginBottom: 20}}
                    />

                    <Form
                        name="basic"
                        labelCol={{span: 6}}
                        wrapperCol={{span: 16}}
                        style={{width: 700}}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Будь ласка введіть ваш e-mail!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Будь ласка введіть ваш пароль!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                            <Button size="large" type="primary" htmlType="submit" style={{paddingInline: 50}}>
                                Вхід
                            </Button>
                        </Form.Item>

                        <Form.Item wrapperCol={{span: 24}}>
                            <Typography style={{textAlign: 'center'}}>
                                Немає аккаунта? <Link to="/account/register">Створити зараз!</Link>
                            </Typography>
                        </Form.Item>
                    </Form>
                </Flex>
            </Row>
        </Spin>
    );
};

export default Login;