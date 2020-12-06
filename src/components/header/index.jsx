import React, {Component} from 'react';
import {Modal, Menu, Dropdown} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import './index.less'
import HeaderUser from '../../components/header-user'

class Header extends Component {

    state = {
        currentTime: formateDate(Date.now())
    };
    getTime = () => {
        setInterval(() => {
            const currentTime = formateDate(Date.now());
            this.setState({currentTime: currentTime})
        }, 1000)
    };
    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        menuList.forEach((item) => {
            if (item.key === path) {
                title = item.title
            } else if (path.indexOf('/project') === 0) {
                title = '项目开发'
            }
        });
        return title
    };
    logout = () => {
        Modal.confirm({
            title: '确认要退出系统吗?',
            icon: <ExclamationCircleOutlined/>,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                memoryUtils.user = {};
                storageUtils.removeUser();
                this.prop.history.replace('/')
            },
            onCancel() {
            },
        });
    };

    componentDidMount() {
        this.getTime()
    }

    render() {
        const {currentTime} = this.state;
        const user = memoryUtils.user;
        const title = this.getTitle();
        const menu = (<Menu>
            <Menu.Item>
                <span className="ant-dropdown-link" onClick={() => {
                    this.logout()
                }}>退出系统</span>
            </Menu.Item>
        </Menu>);


        const isHomePage = title === '工作台' ? true : false
        return (
            <div className='header' style={{height: isHomePage ? '230px' : '150px'}}>
                <div className="header-top">
                    <span>{currentTime}</span>

                    <Dropdown overlay={menu} placement="bottomCenter" arrow>

                        <span className='user-name'>
                            <img className="ant-dropdown-img"
                                 src={user.img} alt={user.img}/>
                            {user.username}</span>
                    </Dropdown>

                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        <span>首页</span><i>/</i><s>{title}</s>
                        <h6> {title}</h6>
                    </div>

                </div>
                {isHomePage ? <HeaderUser></HeaderUser> : ''}
            </div>
        )
    }
}

export default withRouter(Header)
