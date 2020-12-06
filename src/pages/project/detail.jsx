import React, {Component} from 'react';
import {Card, List, Descriptions, Tag} from "antd";
import LinkButton from "../../components/link-button";
import {ArrowLeftOutlined} from '@ant-design/icons'
import {BASE_IMG_PATH} from '../../utils/constant'
import moment from 'moment';

export default class ProjectDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const project = this.props.location.state;
        const title = (<span>
            <LinkButton onClick={() => this.props.history.goBack()}><ArrowLeftOutlined/></LinkButton>
            <span> 项目详情</span>
        </span>);
        let imgDiv;
        if (project.imgs.length > 0) {

            imgDiv = <div>
                <p>{project.name}的界面详情</p>
                <ul className='img-ul'>
                    {project.imgs.map((p) => {
                        return <li><img src={BASE_IMG_PATH + p} alt=""/></li>
                    })}
                </ul>
            </div>


        }
        return (
            <Card title={title}>
                <div>
                    <Descriptions
                        bordered
                        title={project.name}
                        size={this.state.size}

                    >
                        <Descriptions.Item label="项目名称">{project.name}</Descriptions.Item>
                        <Descriptions.Item label="项目干系人">{project.personLink}</Descriptions.Item>
                        <Descriptions.Item label="项目立项时间">{moment(project.ts).format('YYYY-MM-DD')}</Descriptions.Item>
                        <Descriptions.Item label="项目工期">{moment(project.te).format('YYYY-MM-DD')}</Descriptions.Item>
                        <Descriptions.Item label="项目发起人">{project.person}</Descriptions.Item>
                        <Descriptions.Item label="项目状态">{project.state === '0' ?  <Tag color="#87d068">已完成</Tag> : <Tag color="#f50">开发进行中</Tag>}</Descriptions.Item>
                        <Descriptions.Item label="项目描述">
                            {imgDiv}
                            <div dangerouslySetInnerHTML={{__html: project.desc}}></div>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </Card>
        )
    }
}
