import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { NavLink } from 'react-router-dom'

import './index.less'

export default class TeacherControlPanel extends Component {
  static propTypes = {
    style: PropTypes.object,
    content: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    content: _.noop,
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="teacher-control-panel" style={wrapStyle}>
        <div className="menus-wrap">
          <NavLink to="/dashboard/profile" className="menu-item" activeClassName="current">基本信息</NavLink>
          <NavLink to="/dashboard/profile/edit" className="menu-item" activeClassName="current">编辑主页</NavLink>
          <NavLink to="/dashboard/notification" className="menu-item" activeClassName="current">我的消息</NavLink>
          <NavLink to="/dashboard/plan" className="menu-item" activeClassName="current">课程安排</NavLink>
          <NavLink to="/dashboard/price" className="menu-item" activeClassName="current">时间&价格</NavLink>
          <NavLink to="/dashboard/account" className="menu-item" activeClassName="current">我的账户</NavLink>
        </div>
        <div className="content-wrap">
          { React.createElement(this.props.content) }
        </div>
      </div>
    )
  }
}
