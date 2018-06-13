import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input, Button, Form, Select, Upload, Icon, Row, Col } from 'antd'
import { connect } from 'react-redux'

import { SignUpInputAccountInfo } from '../../components'
import './index.less'

class SignUpAsTeacher extends Component {
  static propTypes = {
    style: PropTypes.object,
    alreadySignIn: PropTypes.bool.isRequired,
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
        {
          this.props.alreadySignIn !== undefined && (
            <Fragment>
              <SignUpInputAccountInfo
                style={{
                  width: '290px',
                  margin: '0 auto',
                  padding: '100px 0 70px 0',
                }}
              />
              <div className="cut-line" />
            </Fragment>
          )
        }
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
                <Row type="flex" align="middle" justify="space-between">
                  <Col span={18}>
                    <Input />
                  </Col>
                  <Col span={5}>
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
                <Row type="flex" align="middle" justify="space-between">
                  <Col span={18}>
                    <Input />
                  </Col>
                  <Col span={5}>
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

const mapStateToProps = state => ({
  alreadySignIn: state.AppStatus.alreadySignIn,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpAsTeacher)
