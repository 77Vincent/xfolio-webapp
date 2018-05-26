import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Input, Button, Row, Col } from 'antd'

import './index.less'

export default class SignUpInputAccountInfo extends Component {
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
      <div className="sign-up-input-account-info" style={wrapStyle}>
        <Form layout="horizontal">
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
            <Input />
          </Form.Item>
          <Form.Item
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
                <Input />
              </Col>
              <Col>
                <Button>发送</Button>
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
            <Input />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
