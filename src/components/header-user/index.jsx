import React, {Component} from 'react';
import './index.less'
import {reqProjects, reqPolicys} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";

export default class HeaderUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            policys: [],
        };
    }

    componentDidMount = async () => {
        var projectResult = await reqProjects();
        var policyResult = await reqPolicys();
        this.setState({projects: projectResult.data, policys: policyResult.data})
    };

    render() {
        const user = memoryUtils.user;
        return (
            <div className='header-user'>
                <div className='header-user-left'>
                    <img src={user.img} alt={user.img}/>
                    <h1>欢迎来到 {user.username} 的工作台</h1>
                    <p>{user.desc}</p>
                </div>
                <div className='header-user-right'>
                    <ul>
                        <li>
                            <span>项目申报数量</span>
                            <s>{this.state.policys.length}</s>
                        </li>
                        <li>
                            <span>项目开发数量</span>
                            <s>{this.state.projects.length}</s>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
