import React, {Component} from 'react';
import {Button, Card, Table, Select, Input, Tag, Modal, message} from "antd";
import {PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import {PAGE_SIZE} from '../../utils/constant'
import {reqPolicys, reqAddPolicy, reqDeletePolicy, reqUpdatePolicy, reqSearchPolicy} from '../../api/index'
import LinkButton from "../../components/link-button";
import AddUpdate from './add-update'
import moment from 'moment';

const Item = Select.Option;

export default class policyHome extends Component {
    formRef = React.createRef();
    state = {
        total: 0,
        policys: [],
        searchType: '0', // 搜索类型 0:资质 / 1:补助
        searchName: '',
        showStatus: '-1',
        policy: {}

    };

    getPolicys = async () => {
        const {searchType, searchName} = this.state;
        let result;
        if (searchName) { // 搜索分页
            const params = {type: searchType, name: searchName};
            result = await reqSearchPolicy(params);
            this.initColumns()
        } else { // 一般分页
            result = await reqPolicys();
        }
        if (result.status === 0) {
            const {count, data} = result;

            this.setState({
                total: count,
                policys: data
            })

        }
    };
    handleOnChanges = (value) => {
        console.log(this.state.searchType)
        this.setState({searchType:value},()=>{});

    };

    showUpdate = (_, policy) => {
        this.setState({policy: policy, showStatus: true}, () => {
            this.formRef.current.formRef.current.resetFields();
        })
    };
    showAdd = () => {
        this.setState({policy: {}, showStatus: true}, () => {
            this.formRef.current.formRef.current.resetFields();
        })
    };
    handleCancel = () => {
        this.setState({showStatus: false}, () => {
            this.formRef.current.formRef.current.resetFields();
        })
    };
    deletePolicy = (policy) => {
        const self = this;
        Modal.confirm({
            title: '确认要删除此政策吗?',
            icon: <ExclamationCircleOutlined/>,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                const {_id} = policy;
                const result = reqDeletePolicy(_id);
                result.then(() => {
                    message.success('已删除');
                    self.getPolicys()
                }).catch((err) => {
                    message.error(err)
                });
            },
            onCancel() {
            },
        });
    };
    addAndUpdatePolicy = async () => {
        const values = this.formRef.current.formRef.current.getFieldsValue();
        const {name, type, department, ts} = values;
        if (name !== undefined && type !== undefined && department !== undefined && ts !== undefined) {
            let result;
            if (Object.getOwnPropertyNames(this.state.policy).length === 0) {
                result = await reqAddPolicy(values)
            } else {
                values._id = this.state.policy._id;
                result = await reqUpdatePolicy(values)
            }
            if (result.status === 0) {
                message.success(Object.getOwnPropertyNames(this.state.policy).length === 0 ? '新增政策成功' : '编辑政策成功')
            } else {
                message.error(result.message)
            }
            this.state.showStatus = false;
            this.getPolicys();
        }
    };
    initColumns = () => {
        if (this.state.searchType === '1') {
            this.columns = [
                {
                    title: '政策名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '项目描述',
                    dataIndex: 'desc',
                    key: 'desc',
                },
                {
                    title: '项目类型',
                    render: (_, policy) => (<span>{policy.type === '0' ? '资质' : '补助'}</span>)
                },
                {
                    title: '申报时间',
                    render: (_, policy) => {
                        if (policy.ts) {
                            return (<span>{moment(policy.ts).format('YYYY-MM-DD')}</span>)
                        } else {
                            return (<span>--</span>)
                        }

                    }
                },
                {
                    title: '状态',
                    render: (_, policy) => {
                        if (policy.state === '0') {
                            return (<span>
                                <Tag color="#87d068">已兑现</Tag>

                    </span>)
                        } else {

                            return (<span>
                  <Tag color="#f50">未兑现</Tag>
                    </span>)
                        }
                    }
                },
                {
                    title: '兑现金额',
                    render: (_, policy) => {
                        if (Number(policy.price) > 0) {
                            return (<span>￥{policy.price}</span>)
                        } else {
                            return (<span>--</span>)
                        }
                    }
                },
                {
                    title: '兑现时间',
                    render: (_, policy) => {
                        if (policy.te) {
                            return (<span>{moment(policy.te).format('YYYY-MM-DD')}</span>)
                        } else {
                            return (<span>--</span>)
                        }

                    }
                },
                {
                    title: '操作',
                    width: 150,
                    render: (_, policy) => (
                        <div>
                            <LinkButton onClick={() => this.showUpdate(_, policy)}>修改</LinkButton>
                            <LinkButton onClick={() => this.deletePolicy(_, policy)}>删除</LinkButton>
                        </div>
                    ),
                },

            ];
        } else {
            this.columns = [
                {
                    title: '政策名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '项目描述',
                    dataIndex: 'desc',
                    key: 'desc',
                },

                {
                    title: '项目类型',
                    render: (_, policy) => (<span>{policy.type === '0' ? '资质' : '补助'}</span>)
                },
                {
                    title: '申报时间',
                    render: (_, policy) => {
                        if (policy.ts) {
                            return (<span>{moment(policy.ts).format('YYYY-MM-DD')}</span>)
                        } else {
                            return (<span>--</span>)
                        }

                    }
                },
                {
                    title: '状态',
                    render: (_, policy) => {

                        if (policy.state === '0') {
                            return (<span>
                     <Tag color="#87d068">已完成</Tag>

                    </span>)
                        } else {
                            return (<span>
                          <Tag color="#f50">申报中</Tag>
                    </span>)
                        }

                    }
                },

                {
                    title: '下证时间',
                    render: (_, policy) => {
                        if (policy.te) {
                            return (<span>{moment(policy.te).format('YYYY-MM-DD')}</span>)
                        } else {
                            return (<span>--</span>)
                        }

                    }
                },
                {
                    title: '操作',
                    width: 150,
                    render: (_, policy) => (
                        <div>
                            <LinkButton onClick={() => this.showUpdate(_, policy)}>修改</LinkButton>
                            <LinkButton onClick={() => this.deletePolicy(_, policy)}>删除</LinkButton>
                        </div>

                    ),
                },

            ];
        }

    };

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getPolicys()
    }

    render() {
        const {total} = this.state;
        const title = (<span>
            <Select defaultValue="0" onChange={this.handleOnChanges}>
                <Item value='0'>按照资质</Item>
                <Item value='1'>按照补助</Item>
            </Select>
            <Input style={{width: 200, margin: '0 16px'}}
                   onChange={(e) => this.setState({searchName: e.target.value})}/>
            <Button type='primary' onClick={() => this.getPolicys()}>搜索</Button>
        </span>);
        const extra = (
            <Button type='primary'
                    onClick={() => this.showAdd()}><PlusOutlined/>添加</Button>);
        return (
            <Card title={title} extra={extra}>
                <Table columns={this.columns} rowKey='_id' dataSource={this.state.policys} pagination={{
                    defaultPageSize: PAGE_SIZE,
                    total,
                    showQuickJumper: true,
                    onChange: this.getPolicys
                }}/>

                <Modal
                    title={Object.getOwnPropertyNames(this.state.policy).length === 0 ? '添加项目' : '编辑项目'}
                    visible={this.state.showStatus === true}
                    maskClosable={false}
                    onOk={this.addAndUpdatePolicy}
                    onCancel={this.handleCancel}
                    okText='确认'
                    cancelText='取消'
                >
                    <AddUpdate ref={this.formRef} policy={this.state.policy}> </AddUpdate>
                </Modal>
            </Card>
        )
    }
}
