import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
import {
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const NavBar = (props) => (
    <Layout hasSider>
        <Sider
            style={{
                paddingLeft: "10px",
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }}
        >

            <Menu theme="dark" mode="inline" >
                <Link to='/ofertas' >
                    <Menu.Item key="1" icon={<ShoppingCartOutlined />} >
                        Ofertas
                    </Menu.Item>
                </Link>
                <Link to='/admin' >
                    <Menu.Item key="2" icon={<UserOutlined />} >
                        Admnistração
                    </Menu.Item>
                </Link>
            </Menu>
        </Sider>
    </Layout>
);

export default NavBar