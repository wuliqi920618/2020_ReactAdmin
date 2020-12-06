import React, {Component} from 'react';
import {Button, Card, Input, Form, DatePicker, message, Select} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from "../../components/link-button";
import {reqAddProject, reqUpdateProject} from '../../api'
import RichTextEditor from '../../components/rich-text-editor'
import PicturesWall from '../../components/pictures-wall'
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';
export default class projectAddUpdate extends Component {
    editRef = React.createRef();
    picRef = React.createRef();
    formRef = React.createRef();
    state = {
        optionLists: [],
        project: {},
        editorState: '',
        categoryId: '',
        pCategoryId: '',
        name: '',
        desc: '',
        price: 0,
        detail: '',
        imgs: []
    };

    onChangeTe = () => {
    };
    onChangeTs = () => {
    };
    onSubmit = async () => {
        const validateResult = await this.formRef.current.validateFields();
        if (validateResult) {
            let desc = this.editRef.current.getText();
            const imgs = this.picRef.current.getImgs();
            const values = await this.formRef.current.getFieldsValue();
            const {name, person, personLink, state, ts, te} = values;
            const project = {name, desc, person, personLink, state, ts, te, imgs};
            let result;
            if (this.isUpdate) {
                project._id = this.project._id;
                result = await reqUpdateProject(project);
            } else {
                result = await reqAddProject(project);
            }
            if (result.status === 0) {
                message.success(this.isUpdate ? "更新成功" : "添加成功");
                this.props.history.goBack()
            } else {
                message.error(this.isUpdate ? "更新失败" : "添加失败")
            }
        }
    };

    componentWillMount() {
        // 取出跳转传入的数据
        const project = this.props.location.state;
        this.project = project || {};
    }

    render() {
        const project = this.project || {};
        this.isUpdate = Object.getOwnPropertyNames(project).length === 0 ? false : true
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 8}
        };
        const {Option} = Select;
        const title = (<span>
            <LinkButton onClick={() => this.props.history.goBack()}><ArrowLeftOutlined/></LinkButton>
            <span>{this.isUpdate ? '修改项目' : '添加项目'}</span>
        </span>);
        return (
            <Card title={title}>
                <Form ref={this.formRef}>
                    <Form.Item
                        {...formItemLayout}
                        label="项目名称："
                        name="name"
                        initialValue={project.name}
                        rules={[{required: true, message: '请输入项目名称'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="项目发起人："
                        name="person"
                        initialValue={project.person}
                        rules={[{required: true, message: '请输入项目发起人'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="项目主要干系人："
                        name="personLink"
                        initialValue={project.personLink}
                        rules={[{required: true, message: '请输入项目主要干系人'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="项目状态"
                        name="state"
                        initialValue={this.isUpdate === true ? project.state : '1'}
                        rules={[{state: true, message: '请选择项目状态'}]}
                    >
                        <Select>
                            <Option value="0">已完成</Option>
                            <Option value="1">开发中</Option>
                        </Select>

                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="立项时间："
                        name="ts"
                        initialValue={moment(project.ts)}
                    >
                        <DatePicker onChange={this.onChangeTs} format={dateFormat}/>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="完工时间："
                        name="te"
                        initialValue={this.isUpdate ? project.ts ? moment(project.te) : '' : ''}
                    >
                        <DatePicker onChange={this.onChangeTe} format={dateFormat}/>
                    </Form.Item>

                    <Form.Item

                        {...formItemLayout}
                        label="项目图片："
                        name="imgs"
                    >
                        <PicturesWall ref={this.picRef} imgs={project.imgs}></PicturesWall>
                    </Form.Item>


                    <Form.Item
                        label="项目描述："
                        name="desc"
                        labelCol={{span: 2}}
                        wrapperCol={{span: 20}}
                    >
                        <RichTextEditor ref={this.editRef} text={project.desc}></RichTextEditor>
                    </Form.Item>


                </Form>
                <Button type='primary' onClick={this.onSubmit}>提交</Button>
            </Card>
        )
    }
}
