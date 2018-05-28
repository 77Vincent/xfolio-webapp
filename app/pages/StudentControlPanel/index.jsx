import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { StudentBasicAccountInfo, UploadAvatar } from '../../components'
import './index.less'

export default class StudentControlPanel extends Component {
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
      <div className="student-control-panel" style={wrapStyle}>
        <div className="menus-wrap">
          <a href="javascript:;" className="menu-item current">基本信息</a>
          <a href="javascript:;" className="menu-item">我的消息</a>
          <a href="javascript:;" className="menu-item">课程安排</a>
          <a href="javascript:;" className="menu-item">我的账户</a>
        </div>
        <div className="content-wrap">
          <UploadAvatar />
          <StudentBasicAccountInfo />
        </div>
      </div>
    )
  }
}
