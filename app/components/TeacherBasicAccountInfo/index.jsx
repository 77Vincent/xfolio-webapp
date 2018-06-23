import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Button } from 'antd'

import { UpdateAccountInfoItem } from '../../components'
import './index.less'
import { GENDER_OPTIONS } from '../../Consts'
import constDataHolder from '../../store/constDataHolder'

import SelectMultiple from '../SelectMultiple'
import SelectSingle from '../SelectSingle'
import InfoInput from '../InfoInput'

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
            value={accountInfo.name}
            isEdit={isEdit}
            onChange={this.handleValueChange}
          />
        </div>

        <div className="xfolio-account-info-item">
          <InfoInput
            id="mobilephone"
            label="手机号"
            value={accountInfo.mobilephone}
            isEdit={isEdit}
            onChange={this.handleValueChange}
          />
        </div>

        <div className="xfolio-account-info-item">
          <InfoInput
            id="email"
            label="电子邮箱"
            value={accountInfo.email}
            isEdit={isEdit}
            onChange={this.handleValueChange}
          />
        </div>

        <div className="xfolio-account-info-item">
          <SelectSingle
            id="gender"
            label="性别"
            value={GENDER_OPTIONS[Number(accountInfo.gender)]}
            isEdit={isEdit}
            options={GENDER_OPTIONS}
            onChange={this.handleValueChange}
          />
        </div>

        <div className="xfolio-account-info-item">
          <div className="xfolio-current-info-wrapper">
            <p className="xfolio-text-info-title">学历</p>
            <p className="xfolio-text-info-value">
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
                return this.props.updateUserIfo({ userId, field: 'degree_id', value })
              }}
            />
          </div>
        </div>

        <div className="xfolio-account-info-item">
          <div className="xfolio-current-info-wrapper">
            <p className="xfolio-text-info-title">授课地点</p>
            {
              accountInfo.places.length ?
                _.map(accountInfo.places, (each, i) => {
                  return <p className="xfolio-text-info-value" key={i}>{each.cn}</p>
                }) :
                <p className="xfolio-text-info-value">未设置</p>
            }
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="custom"
              inputElem={(
                <SelectMultiple
                  resource="places"
                  maxSelection={4}
                  value={(
                    _.reduce(accountInfo.places, (r, v) => {
                      r.push({ key: `${v.id}`, label: v.cn })
                      return r
                    }, [])
                  )}
                />
              )}
              onSubmit={(value) => {
                return this.props.updateUserPlaces(value)
              }}
            />
          </div>
        </div>

        <div className="xfolio-account-info-item">
          <div className="xfolio-current-info-wrapper">
            <p className="xfolio-text-info-title">毕业国家</p>
            {
              accountInfo.countries.length ?
                _.map(accountInfo.countries, (each, i) => {
                  return <p className="xfolio-text-info-value" key={i}>{each.cn}</p>
                }) :
                <p className="xfolio-text-info-value">未设置</p>
            }
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="custom"
              inputElem={(
                <SelectMultiple
                  resource="countries"
                  maxSelection={1}
                  value={(
                    _.reduce(accountInfo.countries, (r, v) => {
                      r.push({ key: `${v.id}`, label: v.cn })
                      return r
                    }, [])
                  )}
                />
              )}
              onSubmit={(value) => {
                return this.props.updateUserCountries(value)
              }}
            />
          </div>
        </div>

        <div className="xfolio-account-info-item">
          <div className="xfolio-current-info-wrapper">
            <p className="xfolio-text-info-title">毕业院校</p>
            {
              accountInfo.schools.length ?
                _.map(accountInfo.schools, (each, i) => {
                  return <p className="xfolio-text-info-value" key={i}>{each.cn}</p>
                }) :
                <p className="xfolio-text-info-value">未设置</p>
            }
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="custom"
              inputElem={(
                <SelectMultiple
                  resource="schools"
                  maxSelection={1}
                  value={(
                    _.reduce(accountInfo.schools, (r, v) => {
                      r.push({ key: `${v.id}`, label: v.cn })
                      return r
                    }, [])
                  )}
                />
              )}
              onSubmit={(value) => {
                return this.props.updateUserSchools(value)
              }}
            />
          </div>
        </div>

        <div className="xfolio-account-info-item">
          <div className="xfolio-current-info-wrapper">
            <p className="xfolio-text-info-title">授课专业</p>
            {
              accountInfo.majors.length ?
                _.map(accountInfo.majors, (each, i) => {
                  return <p className="xfolio-text-info-value" key={i}>{each.cn}</p>
                }) :
                <p className="xfolio-text-info-value">未设置</p>
            }
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="custom"
              inputElem={(
                <SelectMultiple
                  resource="majors"
                  maxSelection={3}
                  value={(
                    _.reduce(accountInfo.majors, (r, v) => {
                      r.push({ key: `${v.id}`, label: v.cn })
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

        <div className="xfolio-account-info-item">
          <div className="xfolio-current-info-wrapper">
            <p className="xfolio-text-info-title">现居地</p>
            <p className="xfolio-text-info-value">
              {
                accountInfo.city ?
                constDataHolder.cities.filter(each => each.id === accountInfo.city)[0].fullname :
                '未设置'
              }
            </p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="custom"
              inputElem={(
                <SelectMultiple
                  resource="cities"
                  maxSelection={1}
                  onChange={(value) => { this.requestTeacherList({ city: value }) }}
                  value={(
                    _.reduce(constDataHolder.cities.filter(each => each.id === accountInfo.city), (r, v) => {
                      r.push({ key: String(v.id), label: v.fullname })
                      return r
                    }, [])
                  )}
                />
              )}
              onSubmit={(value) => {
                return this.props.updateUserIfo({
                  userId,
                  field: 'city',
                  value: value.length ? String(value[0]) : null,
                })
              }}
            />
          </div>
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
