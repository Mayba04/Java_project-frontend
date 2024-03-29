import React, { useState } from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,

} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import {Link} from "react-router-dom";

const {  Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to={"/"} >Категорії</Link>, '1', <PieChartOutlined />),
    getItem(<Link to={"/product"}>Товари</Link>, '2', <DesktopOutlined />),
];

const DefaultSider = () => {

    const [collapsed, setCollapsed] = useState(false);
    //const [selectedKey, setSelectedKey] = useState('');

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark"
                  defaultSelectedKeys={['1']}
                  //selectedKeys = {[selectedKey]}
                  //onSelect = {({key})=> setSelectedKey(key)}
                  mode="inline"
                  items={items} />
        </Sider>


    );
}

export default DefaultSider;