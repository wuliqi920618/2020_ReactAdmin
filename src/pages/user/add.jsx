import React, {Component} from 'react';
import {Input, Form} from "antd";
import PicturesWall from '../../components/pictures-wall'

export default class Add extends Component {
    formRef = React.createRef();
    picRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    getData = () => {
        const imgs = this.picRef.current.getImgs();
        return imgs.join('')
    };

    render() {
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16}

        };

        return (
            <div>
                <Form ref={this.formRef}>
                    <Form.Item
                        {...formItemLayout}
                        label="用户名："
                        name="username"
                        rules={[{required: true, message: '请输入用户名'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="密码："
                        name="password"
                        rules={[{required: true, message: '请输入密码'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="岗位："
                        name="staff"
                        rules={[{required: true, message: '请输入岗位'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="座右铭："
                        name="desc"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="项目图片："
                        name="imgs"
                    >
                        <PicturesWall ref={this.picRef} imgs={[]}></PicturesWall>
                    </Form.Item>


                </Form>
            </div>
        )
    }
}
