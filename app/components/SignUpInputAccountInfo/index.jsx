import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Input, Button, Row, Col } from 'antd'

import { Log } from '../../utils'
import { SEND_CAPTCHA_COUNT_DOWN } from '../../Consts'
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
    const { getFieldDecorator } = this.props.form

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
              span: 5,
            }}
            wrapperCol={{
              span: 17,
            }}
          >
            {
              getFieldDecorator('mobilephone', {
                rules: [
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1\d{10}$/, message: '请输入11位手机号' },
                ],
              })((
                <Input autoComplete="tel-national" />
              ))
            }
          </Form.Item>
          <Form.Item
            className="input-captcha-wrap"
            label="验证码"
            colon={false}
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 17,
            }}
          >
            <Row type="flex" align="middle" justify="space-between">
              <Col span={15}>
                {
                  getFieldDecorator('captcha', {
                    rules: [
                      { required: true, message: '请输入验证码' },
                    ],
                  })((
                    <Input />
                  ))
                }
              </Col>
              <Col span={7}>
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
          </Form.Item>
          <Form.Item
            label="账户密码"
            colon={false}
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 17,
            }}
          >
            {
              getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入密码' },
                  { pattern: /.{6,20}/, message: '密码长度必须为6-20个字符' },
                ],
              })((
                <Input type="current-password" />
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
