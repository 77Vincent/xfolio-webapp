import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Anchor, Divider, Select, Radio, Pagination } from 'antd'
import { connect } from 'react-redux'

import { TeacherInfoSnapshot, SelectCountry, SelectMajors, SelectCity } from '../../components'
import { Request } from '../../utils'
import { COURSE_PLACE_OPTIONS, GENDER_OPTIONS, PRICE_ORDER_OPTIONS } from '../../Consts'
import './index.less'

class Teachers extends Component {
  static propTypes = {
    style: PropTypes.object,
    accountInfo: PropTypes.object.isRequired,
    getFollowingIds: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  state = {
    filterOptions: {
      majors: this.props.accountInfo.majors,
      country: this.props.accountInfo.country,
      place: this.props.accountInfo.place,
      gender: 1,
      city: null,
      price: 1,
    },
    teacherList: [],
    currentPage: 1,
    pageSize: 7,
  }

  componentDidMount() {
    this.requestTeacherList()
    this.props.getFollowingIds(this.props.accountInfo.id)
  }

  componentWillUnmount() {
  }

  requestTeacherList = () => {
    log('requestTeacherList ', this.state.filterOptions)
    const options = _.assign({}, this.state.filterOptions, {
      majors: this.state.filterOptions.majors.join(','),
    })
    log('options ', options)
    Request.getTeachers({}).then((res) => {
      const teacherList = res.body !== null ? res.body : []
      log('teacherList ', teacherList)
      if (_.isEmpty(teacherList) === false) {
        this.setState({
          teacherList,
        })
      }
    }).catch((e) => {
      log('getTeachers e ', e)
    })
  }

  handleUpdateFilterOptions = (key, value) => {
    log('handleUpdateFilterOptions ', key, value)
    this.state.filterOptions.key = value
    this.setState({
      filterOptions: this.state.filterOptions,
    })
  }

  handlePaginationChange = (page) => {
    log('handlePaginationChange ', page)
    this.setState({
      currentPage: page,
    })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { teacherList, currentPage, pageSize } = this.state
    const teacherListDataStart = (currentPage - 1) * pageSize
    const teacherListData = teacherList.slice(teacherListDataStart, teacherListDataStart + pageSize)

    return (
      <div className="teachers-wrap" style={wrapStyle}>
        <Anchor
          showInkInFixed={false}
          getContainer={() => (document.body)}
        >
          <div className="teachers-filter-wrap">
            <div className="filter-item-wrap">
              <h4 className="title">专业</h4>
              <Divider />
              <SelectMajors
                value={(
                  _.reduce(this.state.filterOptions.majors, (r, v) => {
                    r.push({
                      key: `${v.id}`,
                      label: v.cn,
                    })
                    return r
                  }, [])
                )}
                onChange={(value) => {
                  this.state.filterOptions.majors = value
                  this.setState({
                    filterOptions: this.state.filterOptions,
                  })
                }}
              />
            </div>
            <div className="filter-item-wrap">
              <h4 className="title">申请国家</h4>
              <Divider />
              <SelectCountry
                onChange={(value) => {
                  log('SelectCountry onChange ', value)
                }}
              />
            </div>
            <div className="filter-item-wrap">
              <h4 className="title">授课方式</h4>
              <Divider />
              <Select
                defaultValue={this.state.filterOptions.place}
                onChange={(value) => {
                  this.handleUpdateFilterOptions('place', value)
                }}
              >
                {
                  _.map(_.values(COURSE_PLACE_OPTIONS), (placeInfo, i) => {
                    return (
                      <Select.Option value={placeInfo.value} key={i}>{placeInfo.name}</Select.Option>
                    )
                  })
                }
              </Select>
            </div>
            <div className="filter-item-wrap">
              <h4 className="title">性别</h4>
              <Divider />
              <Select
                defaultValue={this.state.filterOptions.gender}
                onChange={(value) => {
                  this.handleUpdateFilterOptions('gender', value)
                }}
              >
                {
                  _.map(_.values(GENDER_OPTIONS), (genderInfo, i) => {
                    return (
                      <Select.Option value={genderInfo.value} key={i}>{genderInfo.name}</Select.Option>
                    )
                  })
                }
              </Select>
            </div>
            <div className="filter-item-wrap">
              <h4 className="title">城市</h4>
              <Divider />
              <SelectCity
                onChange={(value) => {
                  this.state.filterOptions.city = value
                  this.setState({
                    filterOptions: this.state.filterOptions,
                  })
                }}
              />
            </div>
            <div className="filter-item-wrap">
              <h4 className="title">价格</h4>
              <Divider />
              <Radio.Group
                defaultValue={PRICE_ORDER_OPTIONS.LOW_TO_HIGH}
                onChange={(e) => {
                  this.handleUpdateFilterOptions('price', e.target.value)
                }}
              >
                <Radio value={PRICE_ORDER_OPTIONS.LOW_TO_HIGH}>由低到高</Radio>
                <Radio value={PRICE_ORDER_OPTIONS.HIGH_TO_LOW}>由高到低</Radio>
              </Radio.Group>
            </div>
          </div>
        </Anchor>
        <div className="teacher-list-wrap">
          <div className="content-wrap">
            {
              teacherList.length > 0 && (
                _.map(teacherListData, (teacherInfo, index) => (
                  <TeacherInfoSnapshot
                    teacherInfo={teacherInfo}
                    isFollowing={_.includes(this.props.accountInfo.followingIds, teacherInfo.id)}
                    key={index}
                  />
                ))
              )
            }
            {
              teacherList.length === 0 && (
                <p>没有符合条件的老师~</p>
              )
            }
          </div>
          {
            this.state.teacherList.length > pageSize && (
              <Pagination
                defaultCurrent={1}
                pageSize={pageSize}
                total={this.state.teacherList.length}
                onChange={this.handlePaginationChange}
              />
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accountInfo: state.AccountInfo,
})

const mapDispatchToProps = dispatch => ({
  getFollowingIds: dispatch.AccountInfo.getFollowingIds,
})

export default connect(mapStateToProps, mapDispatchToProps)(Teachers)
