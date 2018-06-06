import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import { USER_ROLE } from '../../Consts'
import './index.less'

class SignIn extends Component {
  static propTypes = {
    style: PropTypes.object,
    form: PropTypes.object.isRequired,
    updateAccountInfo: PropTypes.func.isRequired,
    updateUserSignInStatus: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.mobile === '13000000000') {
          this.props.updateAccountInfo({
            mobileNumber: values.mobile,
            userRole: USER_ROLE.TEACHER,
          })
        } else {
          this.props.updateAccountInfo({
            mobileNumber: values.mobile,
            userRole: USER_ROLE.STUDENT,
          })
        }
        this.props.updateUserSignInStatus(true)
        const urlSearch = queryString.parse(this.props.location.search.substring(1))
        // 重定向到登录前页面
        this.props.history.push(urlSearch.to || '/dashboard/profile')
      }
    })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { getFieldDecorator } = this.props.form

    return (
      <div className="sign-in-wrap" style={wrapStyle}>
        <Form
          layout="horizontal"
          hideRequiredMark
          onSubmit={this.handleSubmit}
        >
          <Form.Item
            label="手机号码"
            colon={false}
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 19,
            }}
          >
            {
              getFieldDecorator('mobile', {
                initialValue: '13000000000',
                rules: [
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1\d{10}$/, message: '请输入11位手机号' },
                ],
              })((
                <Input />
              ))
            }
          </Form.Item>
          <Form.Item
            label="账号密码"
            colon={false}
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 19,
            }}
          >
            {
              getFieldDecorator('password', {
                initialValue: '123456',
                rules: [
                  { required: true, message: '请输入密码' },
                  { pattern: /.{6,20}/, message: '密码长度必须为6-20个字符' },
                ],
              })((
                <Input type="current-password" />
              ))
            }
          </Form.Item>
          <div className="account-opera-buttons">
            <Link to="/forgot">忘记密码</Link>
            <Link to="/signup-choose-role">注册用户</Link>
          </div>
          <Button
            className="button-signin"
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
        </Form>
      </div>
    )
  }
}

const SignInWrapped = Form.create({})(SignIn)

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  updateAccountInfo: dispatch.AccountInfo.updateAccountInfo,
  updateUserSignInStatus: dispatch.AppStatus.updateUserSignInStatus,
})

export default connect(null, mapDispatchToProps)(SignInWrapped)
