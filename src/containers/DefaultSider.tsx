import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, Route, Routes } from 'react-router-dom'; // Зміни в імпортах
import ProductListPage from '../product/list/ProductListPage';

const { Sider } = Layout;

const DefaultSider = () => {
    const items: { key: string; icon: JSX.Element; label: string; to?: string }[] = [
        { key: 'sub1', icon: <UserOutlined />, label: 'subnav 1', to: '/page1' },
        { key: 'sub2', icon: <LaptopOutlined />, label: 'subnav 2', to: '/page2' },
        { key: 'sub3', icon: <NotificationOutlined />, label: 'subnav 3', to: '/page3' },
        { key: 'sub4', icon: <ShoppingCartOutlined />, label: 'Product', to: '/product/list' },
    ];

    return (
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu mode="inline" defaultSelectedKeys={['sub1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
                {items.map(item => (
                    <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.to !== undefined ? item.to : ''}>{item.label}</Link>
                </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};

export default DefaultSider;
