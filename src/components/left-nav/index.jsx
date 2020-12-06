import React, {Component} from 'react';
import {Menu, Butfton} from 'antd';
import {Link, withRouter} from 'react-router-dom'
import menuConfig from '../../config/menuConfig'
import './index.less'
import memoryUtils from "../../utils/memoryUtils";

const {SubMenu} = Menu;

class LeftNav extends Component {
    getMenu = (menuList) => {
        const path = this.props.location.pathname;
        return menuList.map((item) => {
            if (!item.children) {
                return (<Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <span dangerouslySetInnerHTML={{__html: item.icon}}></span>
                        {item.title}
                    </Link>
                </Menu.Item>)
            } else {
                if (item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
                    this.openKey = item.key
                }
                return (<SubMenu key={item.key} title={item.title}>
                    <span dangerouslySetInnerHTML={{__html: item.icon}}></span>
                    {this.getMenu(item.children)}
                </SubMenu>)
            }
        })
    };

// 为第一次render准备数据
    componentWillMount() {
        this.menuNodes = this.getMenu(menuConfig)
        this.user = memoryUtils.user
    }

    render() {
        let selectKey = this.props.location.pathname;
        if (selectKey.indexOf('/project') === 0) {
            selectKey = '/project'
        }
        const openKey = this.openKey;
        return (
            <div>
                <div className="left-nav-header">
                    {/* <img src={this.user.img} alt=""/>*/}
                    {/* <h1>{this.user.username}</h1>*/}
                    <h1>工作管理系统</h1>
                </div>
                <div className="left-nav-content">
                    <Menu
                        selectedKeys={[selectKey]}
                        defaultOpenKeys={[openKey]}
                        mode="inline"
                        theme="dark"
                    >
                        {this.menuNodes}
                    </Menu>
                </div>
            </div>
        )
    }
}

export default withRouter(LeftNav)
