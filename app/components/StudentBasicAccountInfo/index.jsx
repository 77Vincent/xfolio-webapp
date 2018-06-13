import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'

import { UpdateAccountInfoItem } from '../../components'
import './index.less'
import { COURSE_PLACE_OPTIONS, GENDER_OPTIONS, GENDER_OPTIONS_NORMALIZED } from '../../Consts'
import { Request } from '../../utils'
import constDataHolder from '../../store/constDataHolder'

import SelectCountry from '../SelectCountry'
import SelectMajors from '../SelectMajors'
import SelectSchool from '../SelectSchool'

class StudentBasicAccountInfo extends Component {
  static propTypes = {
    style: PropTypes.object,
    accountInfo: PropTypes.object.isRequired,
    updateAccountInfo: PropTypes.func.isRequired,
    updateUserMajors: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  updateUserIfo = (field, value) => {
    // 发请求更新
    return Request.updateUserInfo(this.props.accountInfo.id, {
      [field]: value,
    }).then(() => {
      // 更新本地数据
      log('student updateUserInfo ', field, value)
      this.props.updateAccountInfo({
        [field]: value,
      })
    })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { accountInfo } = this.props

    let majorNames = ''
    if (_.isEmpty(accountInfo.majors) === false) {
      majorNames = _.reduce(accountInfo.majors, (r, v) => {
        r.push(v.cn)
        return r
      }, []).join(',')
    }

    return (
      <div className="student-basic-account-info" style={wrapStyle}>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">姓名</p>
            <p className="item-value">{accountInfo.name || '未设置'}</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="input"
              placeholder="请输入姓名"
              value=""
              onSubmit={(value) => {
                return this.updateUserIfo('name', value)
              }}
            />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">性别</p>
            <p className="item-value">
              {accountInfo.gender !== null ? GENDER_OPTIONS_NORMALIZED[accountInfo.gender].name : '未设置'}
            </p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="select"
              placeholder="请选择"
              value={accountInfo.gender}
              options={GENDER_OPTIONS}
              onSubmit={(value) => {
                return this.updateUserIfo('gender', value)
              }}
            />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">电话</p>
            <p className="item-value">{accountInfo.mobilephone || '未设置'}</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="input"
              placeholder="请输入电话号码"
              value=""
              onSubmit={(value) => {
                return this.updateUserIfo('mobilephone', value)
              }}
            />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">邮箱</p>
            <p className="item-value">{accountInfo.email || '未设置'}</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="input"
              placeholder="请输入邮箱"
              value=""
              onSubmit={(value) => {
                return this.updateUserIfo('email', value)
              }}
            />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">申请专业</p>
            <p className="item-value">{majorNames || '未设置'}</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="custom"
              inputElem={(
                <SelectMajors
                  value={(
                    _.reduce(accountInfo.majors, (r, v) => {
                      r.push({
                        key: `${v.id}`,
                        label: v.cn,
                      })
                      return r
                    }, [])
                  )}
                />
              )}
              onSubmit={(value) => {
                return this.props.updateUserMajors(value)
              }}
            />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">授课形式</p>
            <p className="item-value">
              {COURSE_PLACE_OPTIONS[accountInfo.place] ? COURSE_PLACE_OPTIONS[accountInfo.place].name : '未设置'}
            </p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="select"
              placeholder="请选择"
              value={accountInfo.place}
              options={_.values(COURSE_PLACE_OPTIONS)}
              onSubmit={(value) => {
                return this.updateUserIfo('place', value)
              }}
            />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">申请学历</p>
            <p className="item-value">
              {accountInfo.degree_id !== null ? constDataHolder.degrees[accountInfo.degree_id].cn : '未设置'}
            </p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="select"
              placeholder="请选择"
              value={accountInfo.degree_id}
              options={(
                _.reduce(constDataHolder.degrees, (r, v, i) => {
                  r[i] = {
                    value: i,
                    name: v.cn,
                  }
                  return r
                }, [])
              )}
              onSubmit={(value) => {
                return this.updateUserIfo('degree_id', value)
              }}
            />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">目标院校</p>
            <p className="item-value">
              {accountInfo.school_id ? constDataHolder.schoolsNormalized[accountInfo.school_id].cn : '未设置'}
            </p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="custom"
              inputElem={<SelectSchool />}
              onSubmit={(value) => {
                return this.updateUserIfo('school_id', value)
              }}
            />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">申请国家</p>
            <p className="item-value">
              {accountInfo.country ? constDataHolder.countriesNormalized[accountInfo.country].cn : '未设置'}
            </p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="custom"
              inputElem={<SelectCountry />}
              onSubmit={(value) => {
                return this.updateUserIfo('country', value)
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accountInfo: state.AccountInfo,
})

const mapDispatchToProps = dispatch => ({
  updateAccountInfo: dispatch.AccountInfo.updateAccountInfo,
  updateUserMajors: dispatch.AccountInfo.updateUserMajors,
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentBasicAccountInfo)
