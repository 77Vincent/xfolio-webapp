import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Anchor } from 'antd'

import './index.less'

export default class StudentControlPanel extends Component {
  static propTypes = {
    style: PropTypes.object,
    content: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    content: null,
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="student-control-panel" style={this.props.style}>
        <div className="menus-wrap">
          <Anchor
            showInkInFixed={false}
            getContainer={() => (document.body)}
          >
            <div className="menu-list-wrap">
              <NavLink to="/dashboard/profile" className="menu-item" activeClassName="current">基本信息</NavLink>
              <NavLink to="/dashboard/notification" className="menu-item" activeClassName="current">我的消息</NavLink>
              <NavLink to="/dashboard/plan" className="menu-item" activeClassName="current">课程安排</NavLink>
              <NavLink to="/dashboard/account" className="menu-item" activeClassName="current">我的账户</NavLink>
            </div>
          </Anchor>
        </div>
        <div className="content-wrap">
          { React.createElement(this.props.content) }
        </div>
      </div>
    )
  }
}
