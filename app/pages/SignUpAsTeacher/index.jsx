import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input, Button, Form } from 'antd'
import { connect } from 'react-redux'

import constDataHolder from '../../store/constDataHolder'
// import { GENDER_OPTIONS } from '../../Consts'
import { SignUpInputAccountInfo, SelectMultiple } from '../../components'
import './index.less'

class SignUpAsTeacher extends Component {
  static propTypes = {
    style: PropTypes.object,
    accountInfo: PropTypes.object.isRequired,
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
    const { alreadySignIn, accountInfo } = this.props

    return (
      <div className="register-as-teacher-wrap" style={wrapStyle}>
        {
          !alreadySignIn && (
            <Fragment>
              <SignUpInputAccountInfo
                style={{
                  width: '290px',
                  margin: '0 auto',
                  padding: '60px 0 20px',
                }}
              />
              <div className="cut-line" />
            </Fragment>
          )
        }
        <div className="input-user-experience">
          <Form layout="vertical">
            <div className="user-base-info">
              <Form.Item label="性别" >
                <SelectMultiple
                  id="places"
                  maxSelection={4}
                  default={(
                    _.reduce(accountInfo.places, (r, v) => {
                      r.push({ key: `${v.id}`, label: v.cn })
                      return r
                    }, [])
                  )}
                />
              </Form.Item>

              <Form.Item label="名字" >
                <Input
                  value={accountInfo.name}
                />
              </Form.Item>

              <Form.Item label="电子邮箱" >
                <Input
                  value={accountInfo.email}
                />
              </Form.Item>

              <Form.Item label="大陆居民身份证号" >
                <Input
                  value={accountInfo.identity_number}
                />
              </Form.Item>

              <Form.Item label="现居地" >
                <SelectMultiple
                  id="cities"
                  maxSelection={1}
                  onChange={() => { }}
                  isEdit
                  default={(
                    _.reduce(constDataHolder.cities.filter(each => each.id === accountInfo.city), (r, v) => {
                      r.push({ key: String(v.id), label: v.fullname })
                      return r
                    }, [])
                  )}
                />
              </Form.Item>

              <Form.Item label="毕业国家" >
                <SelectMultiple
                  id="schools"
                  maxSelection={1}
                  onChange={() => { }}
                  default={(
                    _.reduce(accountInfo.schools, (r, v) => {
                      r.push({ key: `${v.id}`, label: v.cn })
                      return r
                    }, [])
                  )}
                />
              </Form.Item>
            </div>

            <div className="user-education-info">
              <Form.Item label="职业状态" >
                <Input />
              </Form.Item>

              <Form.Item label="最高学历" >
                <Input />
              </Form.Item>

              <Form.Item label="毕业或在读院校" >
                <Input />
              </Form.Item>

              <Form.Item label="授课专业" >
                <Input />
              </Form.Item>

              <Form.Item label="授课方式" >
                <Input />
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
  accountInfo: state.AccountInfo,
  alreadySignIn: state.AppStatus.alreadySignIn,
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpAsTeacher)
