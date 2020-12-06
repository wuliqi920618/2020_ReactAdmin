import React, {Component} from 'react';
import {Card, Button, Table, Modal, message, Tabs, Tag} from 'antd';
import {PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import {reqProjects, reqDeleteProject} from '../../api/index'
import LinkButton from "../../components/link-button";
import ProjectCard from './project-card'
import moment from 'moment';

const {TabPane} = Tabs;
export default class Product extends Component {
    formRef = React.createRef();
    state = {
        showStatus: false,
        projects: [], // 当前页列表数据
        subProjects: [],
        parentId: '0',
        projectName: '',
        projectId: '',
        parentName: '',
        loading: false
    };
    getProjects = async () => {
        let result = await reqProjects();
        if (result.status === 0) {
            this.setState({projects: result.data})
        } else {
            message.error(result.message)
        }
    };
    deleteProject = (project) => {
        let self = this;
        Modal.confirm({
            title: '确认要删除此项目吗?',
            icon: <ExclamationCircleOutlined/>,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                const {_id} = project;
                const result = reqDeleteProject(_id);
                result.then(() => {
                    message.success('已删除');
                    self.getProjects()
                }).catch((err) => {
                    message.error(err)
                });
            },
            onCancel() {
            },
        });
    };

    componentWillMount() {
        this.columns = [
            {
                title: '项目名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '项目发起人',
                dataIndex: 'person',
                key: 'person',

            },
            {
                title: '项目立项时间',
                render: (_, project) => {
                    if (project.ts) {
                        return (<span>{moment(project.ts).format('YYYY-MM-DD')}</span>)
                    } else {
                        return (<span>--</span>)
                    }
                }
            },
            {
                title: '工期截止',
                render: (_, project) => {
                    if (project.te) {
                        return (<span>{moment(project.te).format('YYYY-MM-DD')}</span>)
                    } else {
                        return (<span>--</span>)
                    }

                }

            },

            {
                title: '项目主要干系人',
                dataIndex: 'personLink',
                key: 'personLink',

            },
            {
                title: '项目进度',
                render: (_, project) => {
                    if (project.state === '0') {
                        return (<span>
                      <Tag color="#87d068">已完成</Tag>

                    </span>)
                    } else {
                        return (<span>
                           <Tag color="#f50">开发中</Tag>
                    </span>)
                    }
                }
            },
            {
                title: '操作',
                width: 200,
                render: (_, project) => (
                    <div>
                        <LinkButton
                            onClick={() => this.props.history.push('/project/detail', project)}>详情</LinkButton>
                        <LinkButton
                            onClick={() => this.props.history.push('/project/addupdate', project)}>修改</LinkButton>
                        <LinkButton
                            onClick={() => this.deleteProject(project)}>删除</LinkButton>
                    </div>

                ),
            },

        ];
    };

    componentDidMount() {
        this.getProjects()
    }


    render() {
        const extra = (<Button type='primary'
                               onClick={() => this.props.history.push('/project/addupdate')}><PlusOutlined/>添加</Button>);
        const {projects, subProjects, parentId, parentName, loading} = this.state;
        const title = this.state.parentId === '0' ? '项目集' : (
            <span>
            <LinkButton onClick={this.showprojects}>一级商品类品</LinkButton>
            <PlusOutlined/>
            <span> {parentName}</span>
            </span>);
        return (
            <Tabs type="card">
                <TabPane tab="项目汇总" key="1">
                    <Card title={title} extra={extra}>
                        <Table columns={this.columns}
                               dataSource={parentId === '0' ? projects : subProjects}
                               rowKey='_id'
                               loading={loading}
                               pagination={{pageSize: 5, showQuickJumper: true, showSizeChanger: true}}
                               bordered/>

                    </Card>
                </TabPane>
                <TabPane tab="项目明细" key="2">
                    <ProjectCard></ProjectCard>
                </TabPane>
            </Tabs>
        )
    }
}
