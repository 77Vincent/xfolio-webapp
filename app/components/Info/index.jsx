import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Radio, Form, Input, Tag, Icon, Button, message } from 'antd'
import _ from 'lodash'

import { Request } from '../../utils'
import './index.less'

class Info extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    setLoading: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    majors: PropTypes.bool.isRequired,
  };

  static defaultProps = {
  };
  state = {
    isEdit: false,
  }
  setEdit = boolean => () => {
    this.setState({ isEdit: boolean })
  }
  submit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.setLoading(true)
        const newValues = values
        if (newValues.id !== this.props.user.id) {
          newValues.newId = newValues.id
        }
        newValues.id = this.props.user.id
        const res = await Request.userUpdate(newValues)
        if (res.status === 200) {
          const data = await res.json()
          this.props.setUser(data)
        } else if (res.status === 500) {
          message.warning('网络连接失败，请稍后再试')
        }
        this.props.setLoading(false)
        this.setState({ isEdit: false })
      }
    })
  }
  field = (value) => {
    if (value) {
      return <span>{value}</span>
    }
    return <span style={{ opacity: 0.3 }}>未填写</span>
  }
  render() {
    const { user } = this.props
    const majorsList = this.props.majors && this.props.majors.map(major => ({ label: major.label, value: major.id }))
    const { getFieldDecorator } = this.props.form

    return (
      <div className="Info">
        {
          // Return nothing when user data has not been fetch yet
          // to prevent error from getting properties from null
          user && majorsList &&
            <Form onSubmit={this.submit}>
              <hgroup>
                {
                  this.state.isEdit ?
                    <div>
                      <h4>名称</h4>
                      <Form.Item className="Info-Form">
                        {getFieldDecorator('name', {
                          rules: [
                            { max: 10, message: '不能超过10个字符' },
                            { required: true, message: '总得有个名字吧' },
                          ],
                          initialValue: user.name,
                        })(<Input type="text" />)}
                      </Form.Item>
                    </div> :
                    <h2>{user.name}</h2>
                }
                {
                  this.state.isEdit ? null : <Icon type="form" onClick={this.setEdit(true)} />
                }
                <h3>{user.certified && '认证老师'}</h3>
              </hgroup>
              <section>
                <h4>头像</h4>
                {
                  this.state.isEdit ?
                    <Form.Item className="Info-Form">
                      {getFieldDecorator('avatar', {
                        rules: [{ max: 20, message: '不能超过20个字符' }],
                        initialValue: user.avatar,
                      })(<Input type="file" id="avatar" accept=".jpg, .jpeg, .png" />)}
                    </Form.Item> :
                    this.field(user.avatar)
                }
              </section>
              <section>
                <h4>学校</h4>
                {
                  this.state.isEdit ?
                    <Form.Item className="Info-Form">
                      {getFieldDecorator('school', {
                        rules: [{ max: 20, message: '不能超过20个字符' }],
                        initialValue: user.school,
                      })(<Input type="text" />)}
                    </Form.Item> :
                    this.field(user.school)
                }
              </section>
              <section>
                <h4>职位</h4>
                {
                  this.state.isEdit ?
                    <Form.Item className="Info-Form">
                      {getFieldDecorator('title', {
                        rules: [{ max: 20, message: '不能超过20个字符' }],
                        initialValue: user.title,
                      })(<Input type="text" />)}
                    </Form.Item> :
                    this.field(user.title)
                }
              </section>
              <section>
                <h4>性别</h4>
                {
                  this.state.isEdit ?
                    <Form.Item className="Info-Form">
                      {getFieldDecorator('gender', {
                        initialValue: user.gender,
                      })((
                        <Radio.Group>
                          <Radio.Button value>先生</Radio.Button>
                          <Radio.Button value={false}>女士</Radio.Button>
                        </Radio.Group>
                      ))}
                    </Form.Item> : <span>{user.gender ? '先生' : '女士'}</span>
                }
              </section>
              <section>
                <h4>简介</h4>
                {
                  this.state.isEdit ?
                    <Form.Item className="Info-Form">
                      {getFieldDecorator('bio', {
                        rules: [{ max: 200, message: '不能超过200个字符' }],
                        initialValue: user.bio,
                      })(<Input.TextArea rows={5} />)}
                    </Form.Item> :
                    this.field(user.bio)
                }
              </section>

              <section>
                <h4>专业</h4>
                {
                  this.state.isEdit ? (
                    <Form.Item className="Info-Form">
                      {getFieldDecorator('majors', {
                        initialValue: user.majors.map(major => major),
                      })(<Checkbox.Group options={majorsList} />)}
                    </Form.Item>
                  ) : (
                    _.map(user.majors, (major, index) => (
                      <Tag key={index}>{majorsList[major - 1].label}</Tag>
                    ))
                  )
                }
              </section>

              <section>
                <h4>手机号</h4>
                {
                  this.state.isEdit ?
                    <Form.Item className="Info-Form">
                      {getFieldDecorator('mobilephone', {
                        initialValue: user.mobilephone,
                      })(<Input />)}
                    </Form.Item> :
                    this.field(user.mobilephone)
                }
              </section>
              <section>
                <h4>邮箱</h4>
                {
                  this.state.isEdit ?
                    <Form.Item className="Info-Form">
                      {getFieldDecorator('email', {
                        rules: [{ type: 'email', message: '请输入正确的邮箱地址' }],
                        initialValue: user.email,
                      })(<Input type="text" />)}
                    </Form.Item> :
                    this.field(user.email)
                }
              </section>
              {
                this.state.isEdit &&
                  <footer>
                    <Button type="primary" htmlType="submit">确认</Button>
                    <Button onClick={this.setEdit(false)}>取消</Button>
                  </footer>
              }
            </Form>
        }
      </div>
    )
  }
}

export default Form.create()(Info)
