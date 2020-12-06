import React, {Component} from 'react'
import './login.css'
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';// 登录的路由组件
import {reqLogin} from '../../api/index'
import {message} from "antd";
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {Redirect} from 'react-router-dom'

const Item = Form.Item;
export default class Login extends Component {
    onFinish = async (values) => {
        const {username, password} = values;
        const result = await reqLogin(username, password);
        if (result.status === 0) {
            message.success('登录成功');
            const user = result.data;
            memoryUtils.user = user;
            storageUtils.saveUser(user);
            this.props.history.replace('/')
        } else {
            message.error(result.msg)
        }
        reqLogin(username, password)
    };

    onFinishFailed = (values, errorFields, outOfDate) => {

    };
    validatorPwd = async (rule, value) => {
        if (!value) {
            throw new Error('密码不能为空')

        } else if (value.length < 4) {
            throw new Error('密码长度不能小于4位')

        } else if (value.length > 12) {
            throw new Error('密码长度不大于12位')

        } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
            throw new Error('格式有误');
        }
    };

    render() {
        const user = memoryUtils.user;
        if (user._id) {
            return <Redirect to='/'/>
        }
        return (
            <div className='login'>
                <section className='login-content'>
                    <div className='login-form-container'>
                        <h2>账号登录</h2>
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Item name="username" rules={[{required: true, whitespace: false, message: '请输入账号!'}, {
                                max: 12,
                                message: '12!'
                            }, {min: 4, message: '4!'}, {pattern: /^[a-zA-Z0-9]+$/, message: '格式有误'}]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon"
                                                             style={{color: 'rgba(0,0,0,0.25)'}}/>} placeholder="账号"/>
                            </Item>
                            <Form.Item name="password"
                                       rules={[{
                                           validator: this.validatorPwd
                                       }]}>
                                <Input prefix={<LockOutlined className="site-form-item-icon"
                                                             style={{color: 'rgba(0,0,0,0.25)'}}/>} type="password"
                                       placeholder="密码"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='login-form-container-left'>
                        工作台管理系统
                    </div>
                </section>
            </div>
        )
    }
}

