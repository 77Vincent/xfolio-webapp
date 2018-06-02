import React, { Component, Fragment } from 'react'
import { Layout, BackTop, Icon } from 'antd'
import { Route, Redirect, Switch } from 'react-router-dom'

import {
  Header,
  Footer,
  Notification,
  StudentProfiles,
  StudentCoursePlan,
  TeacherCoursePlan,
  TeacherCalendarAndPrice,
} from '../components'
import {
  HomePage,
  SignIn,
  SignUpAsStudent,
  SignUpChooseRole,
  SignUpAsTeacher,
  InitTeacherFilter,
  Teachers,
  StudentControlPanel,
  TeacherControlPanel,
  SubmitOrder,
} from '../pages'

import './App.less'

export default class App extends Component {
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <Fragment>
        <Layout.Header className="layout-header-wrap">
          <Header />
        </Layout.Header>
        <Layout.Content>
          <div className="main-content-wrap">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/signup-choose-role" component={SignUpChooseRole} />
              <Route exact path="/signup-as-teacher" component={SignUpAsTeacher} />
              <Route exact path="/signup-as-student" component={SignUpAsStudent} />
              <Route exact path="/init-teacher-filter" component={InitTeacherFilter} />
              <Route exact path="/teachers" component={Teachers} />
              <Route exact path="/submit-order" component={SubmitOrder} />
              <Route
                exact
                path="/dashboard/profile"
                render={() => (
                  <StudentControlPanel
                    content={StudentProfiles}
                  />
                )}
              />
              <Route
                exact
                path="/dashboard/notification"
                render={() => (
                  <StudentControlPanel
                    content={Notification}
                  />
                )}
              />
              <Route
                exact
                path="/dashboard/plan/student"
                render={() => (
                  <StudentControlPanel
                    content={StudentCoursePlan}
                  />
                )}
              />
              <Route
                exact
                path="/dashboard/plan/teacher"
                render={() => (
                  <TeacherControlPanel
                    content={TeacherCoursePlan}
                  />
                )}
              />
              <Route
                exact
                path="/dashboard/price"
                render={() => (
                  <TeacherControlPanel
                    content={TeacherCalendarAndPrice}
                  />
                )}
              />
              <Route exact path="/signin" component={SignIn} />
              <Redirect to="/" push={false} />
            </Switch>
          </div>
        </Layout.Content>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
        <BackTop
          visibilityHeight={100}
          target={() => (document.body)}
        >
          <Icon type="up" />
        </BackTop>
      </Fragment>
    )
  }
}
