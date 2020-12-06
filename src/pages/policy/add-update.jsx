import React, {Component} from 'react';
import {Form, Input, Select, DatePicker} from 'antd';
import PropTypes from 'prop-types'
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

export default class AddUpdate extends Component {
    formRef = React.createRef();
    static propTypes = {
        policy: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            policyType: '0'
        };
    }

    handleOnChanges = (value) => {
        console.log(value)
        this.setState({policyType: value})
    };
    validatorPrice = async (rule, value) => {
        if (value.length > 0) {
            if (typeof value !== 'number' || isNaN(value)) {
                throw new Error('请输入数字')
            }
        }
    };
    validatorLength = async (rule, value) => {
        if (value.length === 0) {
            throw new Error('请输入内容')
        }
    };

    render() {
        const {Option} = Select;
        const {policy} = this.props;
        this.isUpdate = Object.getOwnPropertyNames(policy).length === 0 ? false : true
        let periceDiv;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16}
        };
        if (this.state.policyType === '1') {
            periceDiv = <Form.Item
                {...formItemLayout}
                label="兑现金额"
                name="price"
                initialValue={policy.price}
                rules={[{
                    validator: this.validatorPrice
                }]}
            >
                <Input addonAfter="元"/>
            </Form.Item>
        } else {
            periceDiv = ''
        }
        return (
            <div>
                <Form ref={this.formRef}>
                    <Form.Item
                        {...formItemLayout}
                        label="项目名称"
                        name="name"
                        initialValue={policy.name}
                        rules={[{required: true}, {
                            validator: this.validatorLength
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="经办单位"
                        name="department"
                        initialValue={policy.department}
                        rules={[{required: true}, {
                            validator: this.validatorLength
                        }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="项目类型"
                        name="type"
                        initialValue={this.isUpdate ? policy.type ? policy.type : '' : ''}
                        rules={[{required: true}, {
                            validator: this.validatorLength
                        }]}
                    >

                        <Select onChange={this.handleOnChanges}>
                            <Option value="0">资质类</Option>
                            <Option value="1">补助类</Option>
                        </Select>

                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="项目状态"
                        name="state"
                        initialValue={this.isUpdate ? policy.state ? policy.state : '' : ''}
                        rules={[{required: true}]}
                    >

                        <Select>
                            <Option value="0">已完成</Option>
                            <Option value="1">未完成</Option>
                        </Select>

                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="项目描述"
                        name="desc"
                        initialValue={policy.desc}
                        rules={[{desc: true, message: '请输入项目描述'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="申报时间："
                        name="ts"
                        initialValue={moment(policy.ts)}
                        rules={[{required: true}, {
                            validator: this.validatorLength
                        }]}
                    >
                        <DatePicker onChange={this.onChangeTs} format={dateFormat}/>
                    </Form.Item>

                    <Form.Item
                        label={this.state.policyType === '0' ? '下证时间' : '兑现时间'}
                        name="te"
                        {...formItemLayout}
                        initialValue={this.isUpdate ? policy.ts ? moment(policy.te) : '' : ''}
                    >
                        <DatePicker onChange={this.onChangeTe} format={dateFormat}/>
                    </Form.Item>

                    {periceDiv}

                </Form>
            </div>

        )
    }
}






