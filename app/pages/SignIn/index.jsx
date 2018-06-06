import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import { USER_ROLE } from '../../Consts'
import { Request } from '../../utils'
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
    const { validateFields, setFields, getFieldValue } = this.props.form
    validateFields((err, values) => {
      if (!err) {
        Request.signIn({
          id: values.mobilephone,
          password: values.password,
        }).then(() => {
          this.props.updateAccountInfo({
            mobileNumber: values.mobile,
            userRole: USER_ROLE.TEACHER,
          })
          this.props.updateUserSignInStatus(true)
          // 重定向到登录前页面
          const urlSearch = queryString.parse(this.props.location.search.substring(1))
          this.props.history.push(urlSearch.to || '/dashboard/profile')
        }).catch(() => {
          setFields({
            password: {
              value: getFieldValue('password'),
              errors: [new Error('密码错误')],
            },
          })
        })
      }
    })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { getFieldDecorator, getFieldValue } = this.props.form

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
            hasFeedback
            validateFirst
          >
            {
              getFieldDecorator('mobilephone', {
                rules: [
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1\d{10}$/, message: '请输入11位手机号' },
                  {
                    validator: (rule, value, callback) => {
                      const mobilephone = _.trim(getFieldValue('mobilephone'))
                      Request.getUserInfo(mobilephone).then(() => {
                        callback()
                      }).catch(() => {
                        callback('该手机号未注册')
                      })
                    },
                  },
                ],
                validateFirst: true,
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
            hasFeedback
            validateFirst
          >
            {
              getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入密码' },
                  { pattern: /.{6,}/, message: '密码长度至少为6个字符' },
                ],
                validateFirst: true,
              })((
                <Input type="password" />
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
