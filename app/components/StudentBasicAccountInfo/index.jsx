import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Button, Row, Col } from 'antd'

import { SelectMultiple, SelectSingle, InfoInput } from '../'
import { GENDER_OPTIONS } from '../../Consts'
import constDataHolder from '../../store/constDataHolder'
import './index.less'

class StudentBasicAccountInfo extends Component {
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
      <div className="student-basic-account-info">
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
              <SelectSingle
                label="申请学历"
                default={constDataHolder.degrees[accountInfo.degree_id]}
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
              <SelectMultiple
                id="places"
                label="可以接受的授课地点"
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
                label="目标院校"
                default={accountInfo.schools}
                isEdit={isEdit}
                maxSelection={5}
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
                label="申请专业"
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
                label="申请国家"
                default={accountInfo.countries}
                isEdit={isEdit}
                maxSelection={5}
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
          </Col>
        </Row>

        <Row type="flex" justify="end">
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentBasicAccountInfo)
