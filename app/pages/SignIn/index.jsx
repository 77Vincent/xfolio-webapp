import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import { Request, transformUserInfo, dressUpAfterSignIn } from '../../utils'
import constDataHolder from '../../store/constDataHolder'
import './index.less'

class SignIn extends Component {
  static propTypes = {
    style: PropTypes.object,
    form: PropTypes.object.isRequired,
    updateAccountInfo: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  state = {
    submitting: false,
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { validateFields, setFields, getFieldValue } = this.props.form

    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ submitting: true })
        try {
          const res = await Request.signIn({
            id: values.mobilephone,
            password: values.password,
          })
          const accountData = res.body.data
          window.accountInfo = accountData
          this.props.updateAccountInfo(transformUserInfo(accountData))

          // 存储 token
          constDataHolder.apiToken = res.body.token
          // 初始化数据
          dressUpAfterSignIn(accountData.id, constDataHolder.apiToken)
          // 重定向到登录前页面
          const urlSearch = queryString.parse(this.props.location.search.substring(1))
          this.props.history.push(urlSearch.to || '/dashboard/profile')
        } catch (error) {
          log('sign in error ', error)
          this.setState({ submitting: false })
          setFields({
            password: {
              value: getFieldValue('password'),
              errors: [new Error('密码错误')],
            },
          })
        }
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
            colon={false}
            wrapperCol={{ span: 24 }}
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
                <Input placeholder="手机号码" />
              ))
            }
          </Form.Item>
          <Form.Item
            colon={false}
            wrapperCol={{ span: 24 }}
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
                <Input type="password" placeholder="账号密码" />
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
            loading={this.state.submitting}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInWrapped)
