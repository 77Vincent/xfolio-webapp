import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Layout } from 'antd'
import { Route, Redirect, Switch } from 'react-router-dom'

import {
  Header,
  Footer,
} from '../components'
import {
  DashBoard,
  SignIn,
  SignUpAsStudent,
  SignUpChooseRole,
  SignUpAsTeacher,
  InitTeacherFilter,
  Teachers,
} from '../pages'

import './App.less'

export default class App extends Component {
  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="app_wrap" style={wrapStyle}>
        <Layout.Header className="layout-header-wrap">
          <Header />
        </Layout.Header>
        <Layout.Content>
          <div className="main-content-wrap">
            <Switch>
              <Route exact path="/" component={DashBoard} />
              <Route exact path="/signup-choose-role" component={SignUpChooseRole} />
              <Route exact path="/signup-as-teacher" component={SignUpAsTeacher} />
              <Route exact path="/signup-as-student" component={SignUpAsStudent} />
              <Route exact path="/init-teacher-filter" component={InitTeacherFilter} />
              <Route exact path="/teachers" component={Teachers} />
              <Route exact path="/signin" component={SignIn} />
              <Redirect to="/" push={false} />
            </Switch>
          </div>
        </Layout.Content>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </div>
    )
  }
}
