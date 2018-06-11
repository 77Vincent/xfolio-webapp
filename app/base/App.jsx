import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Layout, BackTop, Icon } from 'antd'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Header,
  Footer,
  Notification,
  StudentProfiles,
  StudentCoursePlan,
  TeachersProfiles,
  TeacherCoursePlan,
  TeacherCalendarAndPrice,
  PrivateRoute,
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
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER_ID, USER_ROLE } from '../Consts'

import './App.less'

class App extends Component {
  static propTypes = {
    accountInfo: PropTypes.object.isRequired,
    updateUserSignInStatus: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

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
              <PrivateRoute exact path="/submit-order" component={SubmitOrder} />
              <PrivateRoute
                exact
                path="/dashboard/profile"
                render={() => (
                  this.props.accountInfo.role_id === USER_ROLE.TEACHER ? (
                    <TeacherControlPanel
                      content={TeachersProfiles}
                    />
                  ) : (
                    <StudentControlPanel
                      content={StudentProfiles}
                    />
                  )
                )}
              />
              <PrivateRoute
                exact
                path="/dashboard/notification"
                render={() => (
                  this.props.accountInfo.role_id === USER_ROLE.TEACHER ? (
                    <TeacherControlPanel
                      content={Notification}
                    />
                  ) : (
                    <StudentControlPanel
                      content={Notification}
                    />
                  )
                )}
              />
              <PrivateRoute
                exact
                path="/dashboard/plan"
                render={() => (
                  this.props.accountInfo.role_id === USER_ROLE.TEACHER ? (
                    <TeacherControlPanel
                      content={TeacherCoursePlan}
                    />
                  ) : (
                    <StudentControlPanel
                      content={StudentCoursePlan}
                    />
                  )
                )}
              />
              <PrivateRoute
                exact
                path="/dashboard/price"
                render={() => (
                  <TeacherControlPanel
                    content={TeacherCalendarAndPrice}
                  />
                )}
              />
              <Route exact path="/signin" component={SignIn} />
              <Route
                exact
                path="/signout"
                component={() => {
                  localStorage.removeItem(LOCAL_STORAGE_TOKEN)
                  localStorage.removeItem(LOCAL_STORAGE_USER_ID)
                  this.props.updateUserSignInStatus(false)
                  return (
                    <Redirect to="/" push={false} />
                  )
                }}
              />
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

const mapStateToProps = state => ({
  accountInfo: state.AccountInfo,
})

const mapDispatchToProps = dispatch => ({
  updateUserSignInStatus: dispatch.AppStatus.updateUserSignInStatus,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

// export default App
