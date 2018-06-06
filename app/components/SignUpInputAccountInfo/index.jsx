import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Input, Button, Row, Col } from 'antd'

import { SEND_CAPTCHA_COUNT_DOWN } from '../../Consts'
import { Request } from '../../utils'
import './index.less'

class SignUpInputAccountInfo extends Component {
  static propTypes = {
    style: PropTypes.object,
    form: PropTypes.object.isRequired,
    submitButton: PropTypes.object,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    submitButton: null,
    onSubmit: _.noop,
  };

  state = {
    canSendCaptcha: true,
    sendCaptchaCountDown: SEND_CAPTCHA_COUNT_DOWN,
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleClickSendCaptcha = () => {
    if (this.state.canSendCaptcha === true) {
      this.setState({
        canSendCaptcha: false,
      })
      const countDownFlag = setInterval(() => {
        const { sendCaptchaCountDown } = this.state
        if (sendCaptchaCountDown > 1) {
          this.setState({
            sendCaptchaCountDown: sendCaptchaCountDown - 1,
          })
        } else {
          clearInterval(countDownFlag)
          this.setState({
            canSendCaptcha: true,
            sendCaptchaCountDown: SEND_CAPTCHA_COUNT_DOWN,
          })
        }
      }, 1000)
    }
  }

  handleInputFocus = (fieldName) => {
    // this.props.form.setFields({
    //   [fieldName]: {
    //     value: this.props.form.getFieldValue(fieldName),
    //     errors: undefined,
    //   },
    // })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form

    return (
      <div className="sign-up-input-account-info" style={wrapStyle}>
        <Form
          layout="horizontal"
          hideRequiredMark
          onSubmit={this.handleSubmit}
        >
          <Form.Item
            label="手机号码"
            colon={false}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            type="flex"
            hasFeedback
            validateFirst
          >
            {
              getFieldDecorator('mobilephone', {
                rules: [
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1\d{10}$/, message: '手机号为11位数字' },
                  {
                    validator: (rule, value, callback) => {
                      const mobilephone = _.trim(getFieldValue('mobilephone'))
                      Request.getUserInfo(mobilephone).then(() => {
                        callback('该手机号已注册')
                      }).catch(() => {
                        callback()
                      })
                    },
                  },
                ],
                validateFirst: true,
              })((
                <Input
                  onClick={() => {
                    this.handleInputFocus('mobilephone')
                  }}
                />
              ))
            }
          </Form.Item>
          <Row type="flex" align="middle" justify="space-between" className="input-captcha-wrap">
            <Col span={18}>
              <Form.Item
                label="验证码"
                colon={false}
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                hasFeedback
                validateFirst
              >
                {
                  getFieldDecorator('captcha', {
                    rules: [
                      { required: true, message: '请输入验证码' },
                      { pattern: /^.{4}$/, message: '验证码为4位' },
                      {
                        validator: (rule, value, callback) => {
                          Log.info('captcha validator', rule, value)
                          const captcha = getFieldValue('captcha')
                          callback()
                        },
                      },
                    ],
                    validateFirst: true,
                  })((
                    <Input
                      onClick={() => {
                        this.handleInputFocus('captcha')
                      }}
                    />
                  ))
                }
              </Form.Item>
            </Col>
            <Col span={5} className="btn-send-captcha-wrap">
              <Button
                disabled={this.state.canSendCaptcha === false}
                onClick={this.handleClickSendCaptcha}
              >
                {
                  this.state.canSendCaptcha ? (
                    '发送'
                  ) : this.state.sendCaptchaCountDown
                }
              </Button>
            </Col>
          </Row>
          <Form.Item
            label="账户密码"
            colon={false}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            hasFeedback
            validateFirst
          >
            {
              getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入密码' },
                  { pattern: /^.{6,}$/, message: '密码至少为6个字符' },
                  { pattern: /^.*[A-Z].*$/, message: '密码需包含大写字母' },
                ],
                validateFirst: true,
              })((
                <Input
                  onClick={() => {
                    this.handleInputFocus('password')
                  }}
                />
              ))
            }
          </Form.Item>
          {this.props.submitButton}
        </Form>
      </div>
    )
  }
}

const SignUpInputAccountInfoWrapped = Form.create({})(SignUpInputAccountInfo)

export default SignUpInputAccountInfoWrapped
