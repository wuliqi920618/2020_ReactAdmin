import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import ProjectHome from './home'
import ProjectAddUpdate from './add-update'
import ProjectDetail from './detail'
import './project.less'


export default class Policy extends Component {

    render() {

        return (
            <div>
                <Switch>
                    <Route path='/project' exact component={ProjectHome}/>
                    <Route path='/project/addupdate' component={ProjectAddUpdate}/>
                    <Route path='/project/detail' component={ProjectDetail}/>
                    <Redirect to='/project'></Redirect>
                </Switch>
            </div>
        )
    }
}
