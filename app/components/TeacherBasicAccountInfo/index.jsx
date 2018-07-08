import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Button, Row, Col, Divider } from 'antd'

import { SelectMultiple, SelectSingle, InfoInput } from '../'
import { GENDER_OPTIONS } from '../../Consts'
import constDataHolder from '../../store/constDataHolder'
import './index.less'

class TeacherBasicAccountInfo extends Component {
  static propTypes = {
    accountInfo: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    updateUserCountries: PropTypes.func.isRequired,
    updateUserSchools: PropTypes.func.isRequired,
    updateUserMajors: PropTypes.func.isRequired,
    updateUserPlaces: PropTypes.func.isRequired,
  }

  state = {
    toUpdate: {},
    isEdit: false,
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleClickBody)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickBody)
  }

  updateInfoWrapElem

  handleClickBody = (e) => {
    if (!this.updateInfoWrapElem.contains(e.target)
        && e.target.closest('.ant-select-dropdown') === null
        && e.target !== this.submitBtn) {
      // ant-select-dropdown 为 ant design select 组件下拉框最外层的 className
      this.setState({ isEdit: false })
    }
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

    return (
      <div className="teacher-basic-account-info" ref={(r) => { this.updateInfoWrapElem = r }}>
        <Row>
          <Col span={12}>
            <div className="xfolio-account-info-item">
              <InfoInput
                label="姓名"
                default={accountInfo.name}
                isEdit={isEdit}
                onChange={(e) => {
                  this.state.toUpdate.name = e.target.value
                  this.setState({ toUpdate: this.state.toUpdate })
                }}
              />
            </div>

            <div className="xfolio-account-info-item">
              <InfoInput
                label="手机号"
                default={accountInfo.mobilephone}
                isEdit={isEdit}
                onChange={(e) => {
                  this.state.toUpdate.mobilephone = e.target.value
                  this.setState({ toUpdate: this.state.toUpdate })
                }}
              />
            </div>

            <div className="xfolio-account-info-item">
              <InfoInput
                label="电子邮箱"
                default={accountInfo.email}
                isEdit={isEdit}
                onChange={(e) => {
                  this.state.toUpdate.email = e.target.value
                  this.setState({ toUpdate: this.state.toUpdate })
                }}
              />
            </div>

            <div className="xfolio-account-info-item">
              <SelectSingle
                label="性别"
                default={GENDER_OPTIONS[Number(accountInfo.gender)]}
                isEdit={isEdit}
                options={GENDER_OPTIONS}
                onChange={(e) => {
                  this.state.toUpdate.gender = e
                  this.setState({ toUpdate: this.state.toUpdate })
                }}
              />
            </div>

            <div className="xfolio-account-info-item">
              <SelectSingle
                label="现居地"
                default={
                  constDataHolder.cities
                    .filter(each => each.id === accountInfo.city)
                    .map(v => ({ value: String(v.id), name: v.fullname }))[0]
                }
                isEdit={isEdit}
                options={
                  _.reduce(constDataHolder.cities, (r, v, i) => {
                    r[i] = { value: i, name: v.fullname }
                    return r
                  }, [])
                }
                onChange={(e) => {
                  this.state.toUpdate.city = String(constDataHolder.cities[e].id)
                  this.setState({ toUpdate: this.state.toUpdate })
                }}
              />
            </div>

            <div className="xfolio-account-info-item">
              <InfoInput
                label="一句话介绍"
                type="textarea"
                default={accountInfo.bio}
                isEdit={isEdit}
                onChange={(e) => {
                  this.state.toUpdate.bio = e.target.value
                  this.setState({ toUpdate: this.state.toUpdate })
                }}
              />
            </div>
          </Col>

          <Col span={12}>
            <div className="xfolio-account-info-item">
              <SelectMultiple
                id="majors"
                label="授课专业"
                isEdit={isEdit}
                maxSelection={3}
                onChange={(e) => {
                  this.props.updateUserMajors(e)
                }}
                default={(
                  _.reduce(accountInfo.majors, (r, v) => {
                    r.push({ key: String(v.id), label: v.cn })
                    return r
                  }, [])
                )}
              />
            </div>

            <div className="xfolio-account-info-item">
              <SelectMultiple
                id="places"
                label="授课地点"
                isEdit={isEdit}
                maxSelection={4}
                onChange={(e) => {
                  this.props.updateUserPlaces(e)
                }}
                default={(
                  _.reduce(accountInfo.places, (r, v) => {
                    r.push({ key: String(v.id), label: v.cn })
                    return r
                  }, [])
                )}
              />
            </div>

            <div className="xfolio-account-info-item">
              <SelectSingle
                label="毕业院校"
                default={accountInfo.schools.map(v => ({ value: v.id, name: v.cn }))[0]}
                isEdit={isEdit}
                options={(
                  _.reduce(constDataHolder.schools, (r, v, i) => {
                    r[i] = { value: i, name: v.cn }
                    return r
                  }, [])
                )}
                onChange={(e) => {
                  this.props.updateUserSchools([constDataHolder.schools[e].id])
                }}
              />
            </div>

            <div className="xfolio-account-info-item">
              <SelectSingle
                label="最高学历"
                default={{
                  value: accountInfo.degree_id,
                  name: constDataHolder.degrees[Number(accountInfo.degree_id)].cn,
                }}
                isEdit={isEdit}
                options={(
                  _.reduce(constDataHolder.degrees, (r, v, i) => {
                    r[i] = { value: i, name: v.cn }
                    return r
                  }, [])
                )}
                onChange={(e) => {
                  this.state.toUpdate.degree_id = e
                  this.setState({ toUpdate: this.state.toUpdate })
                }}
              />
            </div>

            <div className="xfolio-account-info-item">
              <SelectSingle
                label="职业状态"
                default={{
                  value: accountInfo.status_id,
                  name: constDataHolder.status[Number(accountInfo.status_id)].cn,
                }}
                isEdit={isEdit}
                options={(
                  _.reduce(constDataHolder.status, (r, v, i) => {
                    r[i] = { value: i, name: v.cn }
                    return r
                  }, [])
                )}
                onChange={(e) => {
                  this.state.toUpdate.status_id = e
                  this.setState({ toUpdate: this.state.toUpdate })
                }}
              />
            </div>

            <div className="xfolio-account-info-item">
              <SelectSingle
                label="毕业国家"
                default={
                  accountInfo.countries.map(v => ({ value: v.id, name: v.cn }))[0]
                }
                isEdit={isEdit}
                options={(
                  _.reduce(constDataHolder.countries, (r, v, i) => {
                    r[i] = { value: i, name: v.cn }
                    return r
                  }, [])
                )}
                onChange={(e) => {
                  this.props.updateUserCountries([constDataHolder.countries[e].id])
                }}
              />
            </div>
          </Col>
        </Row>

        <Row type="flex" justify="end">
          <Divider />

          <Button
            onClick={() => { this.setState({ isEdit: !this.state.isEdit }) }}
            style={{ display: !this.state.isEdit ? 'block' : 'none' }}
          >
            编辑
          </Button>

          <Button
            onClick={this.handleSubmit}
            type="primary"
            style={{ display: this.state.isEdit ? 'block' : 'none' }}
          >
            完成
          </Button>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accountInfo: state.AccountInfo,
})

const mapDispatchToProps = dispatch => ({
  updateUser: dispatch.AccountInfo.updateUser,
  updateUserCountries: dispatch.AccountInfo.updateUserCountries,
  updateUserSchools: dispatch.AccountInfo.updateUserSchools,
  updateUserMajors: dispatch.AccountInfo.updateUserMajors,
  updateUserPlaces: dispatch.AccountInfo.updateUserPlaces,
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherBasicAccountInfo)
