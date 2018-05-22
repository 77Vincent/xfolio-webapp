import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

import { Info, Schedule, Order, Account } from '../../components'
import { Request, Log } from '../../utils'

import './index.less'

export default class extends React.Component {
  static propTypes = {
    user: PropTypes.bool,
    history: PropTypes.object,
    majors: PropTypes.bool,
    setLoading: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: false,
    history: {},
    majors: false,
  };

  state = {
    isEdit: false,
  }

  componentDidMount = () => {
    if (!this.props.user) {
      this.props.history.push('/sign-in')
    }
  }
  componentDidUpdate = () => {
    if (!this.props.user) {
      this.props.history.push('/sign-in')
    }
  }

  setEdit = boolean => () => {
    this.setState({
      isEdit: boolean,
    })
  }
  submitSignOut = async () => {
    this.props.setLoading(true)
    const res = await Request.signOut()
    if (res.status === 200) {
      this.props.setUser()
    }
    this.props.setLoading(false)
  }
  render() {
    Log.info('isEdit ', this.state.isEdit)

    return (
      <div className="Dashboard">
        <Layout>
          <Layout.Sider width="210" className="Dashboard-Sider">
            <Menu mode="vertical" defaultSelectedKeys={['1']} style={{ borderRight: 0 }}>
              <Menu.Item key="1"><Link to="/dashboard"><Icon type="user" />账户信息</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/dashboard/schedule"><Icon type="calendar" />我的课程</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/dashboard/order"><Icon type="bank" />我的订单</Link></Menu.Item>
              <Menu.Item key="4" >
                <div onClick={this.submitSignOut} role="button" tabIndex={0}>
                  <Icon type="logout" />
                  <span>退出登录</span>
                </div>
              </Menu.Item>
            </Menu>
          </Layout.Sider>

          <Layout.Content className="Dashboard-Content">
            <Route
              exact
              path="/dashboard"
              render={props => (
                <Info
                  user={this.props.user}
                  majors={this.props.majors}
                  setLoading={this.props.setLoading}
                  setUser={this.props.setUser}
                  setEdit={this.setEdit}
                  {...props}
                />
              )}
            />
            <Route path="/dashboard/schedule" component={Schedule} />
            <Route path="/dashboard/order" component={Order} />
            <Route
              path="/dashboard/account"
              render={props => (
                <Account
                  user={this.props.user}
                  majors={this.props.majors}
                  setLoading={this.props.setLoading}
                  setUser={this.props.setUser}
                  {...props}
                />
              )}
            />
          </Layout.Content>
        </Layout>
      </div>
    )
  }
}
