import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

import './index.less'

export default class SignIn extends Component {
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
      <div className="sign-in-wrap" style={wrapStyle}>
        <h2 className="page-title">登录</h2>
        <Form layout="horizontal">
          <Form.Item
            label="手机号码"
            colon={false}
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 18,
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="账号密码"
            colon={false}
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 18,
            }}
          >
            <Input />
          </Form.Item>
          <div className="account-opera-buttons">
            <Link to="/forgot">忘记密码</Link>
            <Link to="/signup">注册用户</Link>
          </div>
          <Button className="button-signin">登录</Button>
        </Form>
      </div>
    )
  }
}
