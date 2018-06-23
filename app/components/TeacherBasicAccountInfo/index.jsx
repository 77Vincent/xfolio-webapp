import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'

import { Request } from '../../utils'
import { UpdateAccountInfoItem } from '../../components'
import './index.less'
import { GENDER_OPTIONS } from '../../Consts'
import constDataHolder from '../../store/constDataHolder'

import SelectMultiple from '../SelectMultiple'

class TeacherBasicAccountInfo extends Component {
  static propTypes = {
    style: PropTypes.object,
    accountInfo: PropTypes.object.isRequired,
    updateUserIfo: PropTypes.func.isRequired,
    updateUserCountries: PropTypes.func.isRequired,
    updateUserSchools: PropTypes.func.isRequired,
    updateUserMajors: PropTypes.func.isRequired,
    updateUserPlaces: PropTypes.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  state = {
    cityInfo: [],
  }

  componentDidMount = async () => {
    const data = await Request.getCities({ search: this.props.accountInfo.city })
    this.setState({ cityInfo: data.body })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { accountInfo } = this.props
    const { id: userId } = accountInfo

    return (
      <div className="teacher-basic-account-info" style={wrapStyle}>
        <div className="xfolio-account-info-item">
          <div className="xfolio-current-info-wrapper">
            <p className="xfolio-text-info-title">姓名</p>
            <p className="xfolio-text-info-value">{accountInfo.name || '未设置'}</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="input"
              placeholder="请输入姓名"
              value=""
              onSubmit={(value) => {
                return this.props.updateUserIfo({ userId, field: 'name', value })
              }}
            />
          </div>
        </div>
        <div className="xfolio-account-info-item">
          <div className="xfolio-current-info-wrapper">
            <p className="xfolio-text-info-title">性别</p>
            <p className="xfolio-text-info-value">
              {
                accountInfo.gender !== null ?
                GENDER_OPTIONS.filter(each => (Number(accountInfo.gender) === each.value))[0].name :
                '未设置'
              }
            </p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="select"
              placeholder="请选择"
              value={accountInfo.gender}
              options={GENDER_OPTIONS}
              onSubmit={(value) => {
                return this.props.updateUserIfo({ userId, field: 'gender', value })
              }}
            />
          </div>
        </div>
        <div className="xfolio-account-info-item">
          <div className="xfolio-current-info-wrapper">
            <p className="xfolio-text-info-title">电话</p>
            <p className="xfolio-text-info-value">{accountInfo.mobilephone || '未设置'}</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="input"
              placeholder="请输入电话号码"
              value=""
              onSubmit={(value) => {
                return this.props.updateUserIfo({ userId, field: 'mobilephone', value })
              }}
            />
          </div>
        </div>
        <div className="xfolio-account-info-item">
          <div className="xfolio-current-info-wrapper">
            <p className="xfolio-text-info-title">邮箱</p>
            <p className="xfolio-text-info-value">{accountInfo.email || '未设置'}</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="input"
              placeholder="请输入邮箱"
              value=""
              onSubmit={(value) => {
                return this.props.updateUserIfo({ userId, field: 'email', value })
              }}
            />
          </div>
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
              { this.state.cityInfo.length ? this.state.cityInfo[0].fullname : '未设置' }
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
                    _.reduce(this.state.cityInfo, (r, v) => {
                      r.push({ key: String(v.id), label: v.fullname })
                      return r
                    }, [])
                  )}
                />
              )}
              onSubmit={(value) => {
                return this.props.updateUserIfo({ userId, field: 'city', value: String(value[0]) })
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
  updateUserIfo: dispatch.AccountInfo.updateUserIfo,
  updateUserCountries: dispatch.AccountInfo.updateUserCountries,
  updateUserSchools: dispatch.AccountInfo.updateUserSchools,
  updateUserMajors: dispatch.AccountInfo.updateUserMajors,
  updateUserPlaces: dispatch.AccountInfo.updateUserPlaces,
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherBasicAccountInfo)
