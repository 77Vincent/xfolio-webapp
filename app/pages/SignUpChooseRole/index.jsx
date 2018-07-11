import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import './index.less'

export default class SignUpChooseRole extends Component {
  static propTypes = {
    style: PropTypes.object,
  }

  static defaultProps = {
    style: {},
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="register-choose-role" style={this.props.style}>
        <h2 className="title">注册新用户</h2>
        <div className="btns-wrap">
          <Button className="btn-choose-role role-student">
            <Link to="/signup-as-student">学生注册</Link>
          </Button>
          <Button className="btn-choose-role role-teacher">
            <Link to="/signup-as-teacher">导师注册</Link>
          </Button>
        </div>
      </div>
    )
  }
}
