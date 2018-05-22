import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form, Input, Row, Col, Modal, message } from 'antd'
import { Request } from '../../utils'

class SignUp extends React.Component {
  static propTypes = {
    user: PropTypes.bool,
    history: PropTypes.object,
    form: PropTypes.object.isRequired,
    setLoading: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: false,
    history: {},
  };

  state = {
    provisionDialog: false,
  }

  componentDidMount = () => {
    if (this.props.user) {
      this.props.history.push('/dashboard')
    }
  }

  componentDidUpdate = () => {
    if (this.props.user) {
      this.props.history.push('/dashboard')
    }
  }

  setProvision = boolean => () => (
    this.setState({
      provisionDialog: boolean,
    })
  )

  submit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.props.setLoading(true)
        const res = await Request.signUp(values)
        if (res.status === 201) {
          const data = await res.json()
          this.props.setUser(data)
        } else {
          message.warning('网络连接失败，请稍后再试')
        }
        this.props.setLoading(false)
      }
    })
  }

  checkUserID = async (rule, value, callback) => {
    if (!value || value[0] === ' ') { return }
    const res = await window.fetch(`/api/users/${value}`)
    if (res.status === 200) {
      callback('已被注册')
    } else {
      callback()
    }
  }
  checkPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致')
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.submit} style={{ maxWidth: '300px', margin: '0 auto' }}>
        <Modal
          title="服务条款"
          footer={null}
          width={800}
          visible={this.state.provisionDialog}
          onCancel={this.setProvision(false)}
        >
          ...
        </Modal>


        <Form.Item>
          {getFieldDecorator('mobilephone', {
            rules: [
              { required: true, message: '请输入手机号' },
              { whitespace: true, message: '不能包含空格' },
              { validator: this.checkUserID },
            ],
            validateTrigger: 'onBlur',
          })(<Input type="text" placeholder="手机号" />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码' },
              { min: 6, message: '不少于6个字符' },
            ],
          })(<Input type="password" placeholder="密码" />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '怎么称呼你呢？' }],
          })(<Input type="text" placeholder="怎么称呼" />)}
        </Form.Item>

        <Form.Item>
          <Row gutter={12}>
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: '请填写验证码' }],
            })((
              <Col span={15}>
                <Input type="text" placeholder="验证码" />
              </Col>
            ))}

            <Col span={9}>
              <Button>获取验证码</Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item >
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">注册</Button>
          <Button style={{ width: '100%' }} >
            <Link to="/sign-in">已有账号，立即登录</Link>
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(SignUp)
