import React, {Component} from 'react';
import {Card, Avatar, message} from 'antd';
import {withRouter} from 'react-router-dom'
import {EditOutlined,AlignCenterOutlined } from '@ant-design/icons';
import './project.less'
import {BASE_IMG_PATH} from '../../utils/constant'
import {reqProjects} from "../../api";
import {Descriptions} from "antd/lib/descriptions";

const {Meta} = Card;

class ProjectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [], // 当前页列表数据
        };
    }

    getProjects = async () => {
        let result = await reqProjects();
        if (result.status === 0) {
            this.setState({projects: result.data})
        } else {
            message.error(result.message)
        }
    };

    componentDidMount() {
        this.getProjects()
    }

    render() {
        return (
            <div className='product-card'>
                {
                    this.state.projects.map((p) => <Card key={p._id} classNamee='product-card-item'
                                                         style={{width: 300, float: 'left', margin: '16px 0 0 16px'}}
                                                         cover={<img alt={BASE_IMG_PATH+p.imgs[0]} src={BASE_IMG_PATH+p.imgs[0]}/>
                                                         }
                                                         actions={[
                                                             <EditOutlined key="edit"
                                                                           onClick={() => this.props.history.push('/project/addupdate', p)}/>,
                                                             <AlignCenterOutlined  key="detail"
                                                                           onClick={() => this.props.history.push('/project/detail', p)}/>,
                                                         ]}
                    >
                        <Meta
                            avatar={<Avatar src={BASE_IMG_PATH+p.imgs[0]}/>}
                            title={p.name}

                        >
                            <div dangerouslySetInnerHTML={{__html: p.desc}}></div>

                        </Meta>
                    </Card>,)
                }
            </div>
        )
    }
}

export default withRouter(ProjectCard)
