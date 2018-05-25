import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input, Button, Form, Select, Upload, Icon, Row, Col } from 'antd'

import './index.less'

export default class RegisterAsTeacher extends Component {
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
      <div className="register-as-teacher-wrap" style={wrapStyle}>
        <div className="input-account-info">
          <label htmlFor="input-mobile-phone-number">
            <span className="input-tip">手机号码</span>
            <div className="input-wrap">
              <Input id="input-mobile-phone-number" />
            </div>
          </label>
          <label htmlFor="input-captcha">
            <span className="input-tip">验证码</span>
            <div className="input-wrap input-captcha-wrap">
              <Input id="input-captcha" />
              <Button>发送</Button>
            </div>
          </label>
          <label htmlFor="input-password">
            <span className="input-tip">账户密码</span>
            <div className="input-wrap">
              <Input id="input-password" />
            </div>
          </label>
        </div>
        <div className="cut-line" />
        <div className="input-user-experience">
          <Form layout="vertical">
            <div className="user-base-info">
              <Form.Item
                label="性别"
              >
                <Select
                  value="male"
                >
                  <Select.Option value="male">男</Select.Option>
                  <Select.Option value="female">女</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="姓名"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="邮箱"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="身份证号"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="现居地"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="国家"
              >
                <Input />
              </Form.Item>
            </div>
            <div className="user-education-info">
              <Form.Item
                label="职业状态"
              >
                <Select
                  value="designer"
                >
                  <Select.Option value="student">在校生</Select.Option>
                  <Select.Option value="designer">设计师</Select.Option>
                  <Select.Option value="teacher">专职导师 </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="最高学历"
              >
                <Select
                  value="master"
                >
                  <Select.Option value="doctor">博士</Select.Option>
                  <Select.Option value="master">硕士</Select.Option>
                  <Select.Option value="undergraduate">本科</Select.Option>
                  <Select.Option value="below_undergraduate">本科以下</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="毕业或在读院校"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="毕业证书"
              >
                <Row align="middle" justify="space-between" gutter={16}>
                  <Col span={18}>
                    <Input />
                  </Col>
                  <Col span={6}>
                    <Upload name="" listType="picture">
                      <Button className="icon-ellipsis">
                        <Icon type="ellipsis" />
                      </Button>
                    </Upload>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                label="授课专业"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="授课方式"
              >
                <Select
                  value="online"
                >
                  <Select.Option value="nolimit">不限</Select.Option>
                  <Select.Option value="online">线上</Select.Option>
                  <Select.Option value="offline">线下</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="user-works-info">
              <Form.Item
                label="作品集"
              >
                <Row align="middle" justify="space-between" gutter={16}>
                  <Col span={18}>
                    <Input />
                  </Col>
                  <Col span={6}>
                    <Upload name="" listType="picture">
                      <Button className="icon-ellipsis">
                        <Icon type="ellipsis" />
                      </Button>
                    </Upload>
                  </Col>
                </Row>
              </Form.Item>
            </div>
          </Form>
          <Button className="btn-submit-form">提交</Button>
          <span className="slogan">愿设计与你同在</span>
        </div>
      </div>
    )
  }
}
