import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Button } from 'antd'

import { SelectMultiple, SelectSingle, InfoInput, UpdateAccountInfoItem } from '../'
import { GENDER_OPTIONS } from '../../Consts'
import constDataHolder from '../../store/constDataHolder'
import './index.less'


class TeacherBasicAccountInfo extends Component {
  static propTypes = {
    accountInfo: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    updateUserIfo: PropTypes.func.isRequired,
    updateUserCountries: PropTypes.func.isRequired,
    updateUserSchools: PropTypes.func.isRequired,
    updateUserMajors: PropTypes.func.isRequired,
    updateUserPlaces: PropTypes.func.isRequired,
  }

  state = {
    toUpdate: {},
    isEdit: false,
  }

  handleValueChange = (e, instance) => {
    const field = e.target ? e.target.name : instance._owner.memoizedProps.id
    const value = e.target ? e.target.value : e
    this.state.toUpdate[field] = value
    this.setState({ toUpdate: this.state.toUpdate })
  }

  handleSubmit = () => {
    this.props.updateUser({
      userId: this.props.accountInfo.id,
      payload: this.state.toUpdate,
    })
    // this.props.updateUserPlaces()
    this.setState({ isEdit: false })
  }

  render() {
    const { isEdit } = this.state
    const { accountInfo } = this.props
    const { id: userId } = accountInfo

    return (
      <div className="teacher-basic-account-info">
        <Button
          onClick={() => { this.setState({ isEdit: !this.state.isEdit }) }}
        >
          { this.state.isEdit ? '取消' : '编辑信息' }
        </Button>

        <Button
          onClick={this.handleSubmit}
          type="primary"
          style={{ display: this.state.isEdit ? 'block' : 'none' }}
        >
          确认
        </Button>

        <div className="xfolio-account-info-item">
          <InfoInput
            id="name"
            label="姓名"
            default={accountInfo.name}
            isEdit={isEdit}
            onChange={this.handleValueChange}
          />
        </div>

        <div className="xfolio-account-info-item">
          <InfoInput
            id="mobilephone"
            label="手机号"
            default={accountInfo.mobilephone}
            isEdit={isEdit}
            onChange={this.handleValueChange}
          />
        </div>

        <div className="xfolio-account-info-item">
          <InfoInput
            id="email"
            label="电子邮箱"
            default={accountInfo.email}
            isEdit={isEdit}
            onChange={this.handleValueChange}
          />
        </div>

        <div className="xfolio-account-info-item">
          <SelectSingle
            id="gender"
            label="性别"
            default={GENDER_OPTIONS[Number(accountInfo.gender)]}
            isEdit={isEdit}
            options={GENDER_OPTIONS}
            onChange={this.handleValueChange}
          />
        </div>

        <div className="xfolio-account-info-item">
          <SelectSingle
            id="degree_id"
            label="学历"
            default={constDataHolder.degrees[accountInfo.degree_id]}
            isEdit={isEdit}
            options={(
              _.reduce(constDataHolder.degrees, (r, v, i) => {
                r[i] = { value: i, name: v.cn }
                return r
              }, [])
            )}
            onChange={this.handleValueChange}
          />
        </div>

        <div className="xfolio-account-info-item">
          <SelectMultiple
            id="places"
            label="授课地点"
            default={accountInfo.places}
            isEdit={isEdit}
            maxSelection={4}
            onChange={(e) => {
              this.props.updateUserPlaces(e)
            }}
            value={(
              _.reduce(accountInfo.places, (r, v) => {
                r.push({ key: `${v.id}`, label: v.cn })
                return r
              }, [])
            )}
          />
        </div>

        <div className="xfolio-account-info-item">
          <SelectMultiple
            id="places"
            label="授课地点"
            default={accountInfo.places}
            isEdit={isEdit}
            maxSelection={4}
            onChange={(e) => {
              this.props.updateUserPlaces(e)
            }}
            value={(
              _.reduce(accountInfo.places, (r, v) => {
                r.push({ key: `${v.id}`, label: v.cn })
                return r
              }, [])
            )}
          />
        </div>

        <div className="xfolio-account-info-item">
          <SelectMultiple
            id="schools"
            label="毕业院校"
            default={accountInfo.schools}
            isEdit={isEdit}
            maxSelection={1}
            onChange={(e) => {
              this.props.updateUserSchools(e)
            }}
            value={(
              _.reduce(accountInfo.schools, (r, v) => {
                r.push({ key: `${v.id}`, label: v.cn })
                return r
              }, [])
            )}
          />
        </div>

        <div className="xfolio-account-info-item">
          <SelectMultiple
            id="majors"
            label="授课专业"
            default={accountInfo.majors}
            isEdit={isEdit}
            maxSelection={3}
            onChange={(e) => {
              this.props.updateUserMajors(e)
            }}
            value={(
              _.reduce(accountInfo.majors, (r, v) => {
                r.push({ key: `${v.id}`, label: v.cn })
                return r
              }, [])
            )}
          />
        </div>

        <div className="xfolio-account-info-item">
          <SelectMultiple
            id="countries"
            label="毕业国家"
            default={accountInfo.countries}
            isEdit={isEdit}
            maxSelection={1}
            onChange={(e) => {
              this.props.updateUserCountries(e)
            }}
            value={(
              _.reduce(accountInfo.countries, (r, v) => {
                r.push({ key: `${v.id}`, label: v.cn })
                return r
              }, [])
            )}
          />
        </div>

        <div className="xfolio-account-info-item">
          <div className="xfolio-current-info-wrapper">
            <p className="xfolio-text-info-title">一句话介绍</p>
            <p className="xfolio-text-info-value">{accountInfo.bio || '未设置'}</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="textarea"
              placeholder="请写一句话表达自己"
              value=""
              onSubmit={(value) => {
                return this.props.updateUserIfo({ userId, field: 'bio', value })
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
  updateUser: dispatch.AccountInfo.updateUser,
  updateUserIfo: dispatch.AccountInfo.updateUserIfo,
  updateUserCountries: dispatch.AccountInfo.updateUserCountries,
  updateUserSchools: dispatch.AccountInfo.updateUserSchools,
  updateUserMajors: dispatch.AccountInfo.updateUserMajors,
  updateUserPlaces: dispatch.AccountInfo.updateUserPlaces,
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherBasicAccountInfo)
