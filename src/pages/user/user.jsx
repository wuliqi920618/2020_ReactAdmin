import {Upload, message, Button, Form, Card, Input, DatePicker, Select, Modal} from "antd";
import './user.less'
import React, {Component} from 'react';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils'
import {reqUpdateUser, reqAddUser} from '../../api'
import storageUtils from "../../utils/storageUtils";
import Add from "../user/add";

export default class User extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            showStatus: false,
            user: {}

        }
    }

    onSubmit = () => {
        const values = this.formRef.current.getFieldsValue();
        const {_id, desc, img} = this.state.user;
        let {username, password} = values;
        let user = {username, password, _id, desc, img};
        this.updateUser(user)
    };
    updateUser = async (user) => {
        const {username, password, _id, desc, img} = user;
        const result = await reqUpdateUser({username, password, _id, desc, img});
        if (result.status === 0) {
            message.success(result.message);
            const user = result.data;
            memoryUtils.user = user;
            storageUtils.saveUser(user);
            this.setState({user})
        } else {
            message.error(result.message)
        }
    };
    //上传事件
    onChange = ({file}) => {
        var self = this;
        if (file.status === 'done') {
            const result = file.response;
            if (result.status === 0) {
                message.success('上传成功了');
                const {username, password, _id, desc} = self.state.user;
                const img = result.data.url;
                const user = {username, password, _id, desc, img};
                this.setState({user});
                self.updateUser({username, password, _id, desc, img})
            } else {
                message.error('上传失败了')
            }
        }
    };
    addUser = async () => {
        var self = this;
        const values = await this.formRef.current.formRef.current.getFieldsValue();
        const img = await this.formRef.current.getData();
        const {username, password, desc} = values;
        const result = await reqAddUser({username, password, desc, img});
        if (result.status === 0) {
            message.success('新增用户成功');
            self.setState({showStatus: false});
            Modal.confirm({
                title: '现在需要切换账号吗?',
                icon: <ExclamationCircleOutlined/>,
                okText: '是的',
                cancelText: '取消',
                onOk() {
                    memoryUtils.user = {};
                    storageUtils.removeUser();
                    self.prop.history.replace('/')
                },
                onCancel() {
                },
            });
        }
        message.error('新增用户失败')
    };
    showAddUser = () => {
        this.setState({showStatus: true})
    };
    handleCancel = () => {
        this.setState({showStatus: false})
    };

    componentWillMount() {
        this.setState({user: memoryUtils.user})
    }

    render() {
        const {fileList} = this.state;
        const props = {
            name: 'image',//name得看接口需求，name与接口需要的name一致
            action: 'user/img/upload',//接口路径
            data: {},//接口需要的参数，无参数可以不写
            multiple: false,//支持多个文件
            showUploadList: false,//展示文件列表
        };

        return (
            <div className='user'>
                <div className='user-left'>
                    <h3>基本设置</h3>
                    <Form ref={this.formRef} layout="vertical">
                        <Form.Item label="用户名：" name="username" initialValue={this.state.user.username}
                                   rules={[{required: true, message: '请输入用户名'}]}>
                            <Input placeholder="请输入用户名"/>
                        </Form.Item>
                        <Form.Item label="密码：" name="password" initialValue={this.state.user.password}
                                   rules={[{required: true, message: '请输入密码'}]}>
                            <Input placeholder="请输入密码"/>
                        </Form.Item>
                        <Form.Item
                            label="座右铭" name="desc"
                            initialValue={this.state.user.desc} rules={[{required: true, message: '请输入座右铭'}]}>
                            <Input placeholder="请输入座右铭"/>
                        </Form.Item>

                    </Form>
                    <Button type='primary' onClick={this.onSubmit}>提交</Button>
                </div>
                <div className='user-center'>

                    <div className='user-center-upload'>
                        <p>头像</p>
                        <img src={this.state.user.img} alt=""/>
                        <Upload {...props}
                                fileList={fileList}
                                onChange={this.onChange}
                        >
                            <Button>
                                上传头像附件
                            </Button>
                        </Upload>
                    </div>

                </div>
                <div className='user-right'>
                    <Button type='primary' onClick={this.showAddUser}>增加用户</Button>
                </div>

                <Modal
                    title='添加用户'
                    visible={this.state.showStatus === true}
                    onOk={this.addUser}
                    onCancel={this.handleCancel}
                    okText='确认'
                    cancelText='取消'
                    maskClosable={false}
                >
                    <Add ref={this.formRef}> </Add>
                </Modal>
            </div>
        )
    }
}
