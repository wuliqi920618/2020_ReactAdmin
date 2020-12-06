import React, {Component} from 'react';
import {Row, Col, Card, Empty, message} from 'antd'
import {reqProjects, reqSearchProject} from '../../api/index'
import LinkButton from "../../components/link-button";
import './home.less'
import {BASE_IMG_PATH} from "../../utils/constant";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            projectState: 0,//0：正在开发的，1：已经完成的
            projects: []
        };
    }

    getProjects = async (state) => {
        let result;
        if (state !== undefined) {
            result = await reqSearchProject(state)
        } else {
            result = await reqProjects();
        }
        if (result.status === 0) {
            this.setState({projects: result.data})
        } else {
            message.error(result.message)
        }
    };

    componentWillMount() {
        this.getProjects(0)
    }

    render() {
        const gridStyle = {width: '25%', height: 240, padding: 24, position: 'relation'};
        const extra = (<LinkButton onClick={() => this.getProjects()}>全部项目</LinkButton>);
        const title = (<span onClick={() => this.getProjects(0)}>正在进行中</span>);
        let content;
        if (this.state.projects.length === 0) {
            content = (<Empty className='no-data' description={
                <span>当前没有正在进行的项目</span>

            }/>)
        } else {
            content = <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <Card title={title} extra={extra}>
                        {
                            this.state.projects.map(c => (
                                <Card.Grid style={gridStyle} className='home-card-item' key={c._id}>
                                    <span><img src={BASE_IMG_PATH + c.imgs[0]} alt={BASE_IMG_PATH + c.imgs[0]}/><span>{c.name}</span></span>
                                    <div className='home-card-desc' dangerouslySetInnerHTML={{__html: c.desc}}></div>
                                    <s>立项时间：{c.time}</s>
                                </Card.Grid>
                            ))
                        }
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>

                </Col>
            </Row>
        }
        return (
            <div className='home'>
                <div className='home-content'>
                    {content}
                </div>


            </div>
        )
    }
}
