import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd'
import Home from '../home/home'
import  Project from '../project/project'
import  Study from '../study/study'
import  Policy from '../policy/policy'
import  Notes from '../notes/notes'
import  User from '../user/user'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'


 const {  Footer, Sider, Content } = Layout;
// 后台管理的路由组件

export default class Admin extends Component {
    render() {
        const user=memoryUtils.user;
        if(!user||!user._id){
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header >Header</Header>
                    <Content style={{margin:20}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/project' component={Project}/>
                            <Route path='/policy' component={Policy}/>
                            <Route path='/study' component={Study}/>
                            <Route path='/notes' component={Notes}/>
                            <Route path='/user' component={User}/>
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{color:'#ccc',textAlign:'center'}}>推荐使用谷歌浏览器，
                        可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
    )
  }
}
