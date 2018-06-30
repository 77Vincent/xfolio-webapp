import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Anchor, Radio, Pagination, Button } from 'antd'
import { connect } from 'react-redux'

import { TeacherInfoSnapshot, SelectMultiple, SelectSingle } from '../../components'
import { Request } from '../../utils'
import { GENDER_OPTIONS, PRICE_ORDER_OPTIONS } from '../../Consts'
import './index.less'

class Teachers extends Component {
  static propTypes = {
    style: PropTypes.object,
    accountInfo: PropTypes.object.isRequired,
    getFollowingIds: PropTypes.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  state = {
    filterOptions: {},
    teacherList: [],
    currentPage: 1,
    pageSize: 7,
    GENDER_OPTIONS_FOR_FILTER: [],
  }

  componentWillMount() {
    const GENDER_OPTIONS_FOR_FILTER = GENDER_OPTIONS.map(each => each)
    GENDER_OPTIONS_FOR_FILTER.push({
      value: [0, 1],
      name: '不限',
    })
    this.setState({ GENDER_OPTIONS_FOR_FILTER })

    const { city, place } = this.props.accountInfo
    this.myFilter = _.assign({}, {
      city,
      place,
      major_id: _.map(this.props.accountInfo.majors, each => (each.id)),
      country_id: _.map(this.props.accountInfo.countries, each => (each.id)),
      school_id: _.map(this.props.accountInfo.schools, each => (each.id)),
    })

    this.requestTeacherList(this.defaultFilter)
    this.props.getFollowingIds(this.props.accountInfo.id)
  }

  componentWillUnmount() {

  }


  defaultFilter = {
    major_id: null,
    country_id: null,
    school_id: null,
    city: null,
    place: null,
    gender: null,
    cost: null,
  }

  requestTeacherList = async (query = {}) => {
    this.setState({
      filterOptions: _.assign(this.state.filterOptions, query),
    })
    try {
      const res = await Request.getTeachers(this.state.filterOptions)
      this.setState({ teacherList: res.body })
    } catch (err) {
      log('getTeachers e ', err)
    }
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
              <SelectMultiple
                id="countries"
                label="申请地区"
                isEdit
                maxSelection={5}
                onChange={(value) => { this.requestTeacherList({ country_id: value }) }}
                default={(
                  _.reduce(this.state.filterOptions.countries, (r, v) => {
                    r.push({ key: String(v.id), label: v.cn })
                    return r
                  }, [])
                )}
              />
            </div>

            <div className="filter-item-wrap">
              <SelectMultiple
                id="schools"
                label="申请院校"
                isEdit
                maxSelection={5}
                onChange={(value) => { this.requestTeacherList({ school_id: value }) }}
                default={(
                  _.reduce(this.state.filterOptions.schools, (r, v) => {
                    r.push({ key: String(v.id), label: v.cn })
                    return r
                  }, [])
                )}
              />
            </div>

            <div className="filter-item-wrap">
              <SelectMultiple
                id="majors"
                label="申请专业"
                isEdit
                maxSelection={3}
                onChange={(value) => { this.requestTeacherList({ major_id: value }) }}
                default={(
                  _.reduce(this.state.filterOptions.majors, (r, v) => {
                    r.push({ key: String(v.id), label: v.cn })
                    return r
                  }, [])
                )}
              />
            </div>

            <div className="filter-item-wrap">
              <SelectMultiple
                id="places"
                isEdit
                label="授课地点"
                maxSelection={4}
                onChange={(value) => { this.requestTeacherList({ place_id: value }) }}
                default={(
                  _.reduce(this.state.filterOptions.places, (r, v) => {
                    r.push({ key: String(v.id), label: v.cn })
                    return r
                  }, [])
                )}
              />
            </div>

            <div className="filter-item-wrap">
              <SelectMultiple
                id="cities"
                label="导师所在城市"
                isEdit
                maxSelection={3}
                onChange={(value) => { this.requestTeacherList({ city: value }) }}
                default={(
                  _.reduce(this.state.filterOptions.cities, (r, v) => {
                    r.push({ key: String(v.id), label: v.fullname })
                    return r
                  }, [])
                )}
              />
            </div>

            <div className="xfolio-account-info-item">
              <SelectSingle
                label="导师性别"
                isEdit
                options={this.state.GENDER_OPTIONS_FOR_FILTER}
                onChange={(value) => { this.requestTeacherList({ gender: value.split(',') }) }}
              />
            </div>

            <div className="filter-item-wrap">
              <div className="xfolio-text-info-title">导师收费</div>
              <Radio.Group
                onChange={(e) => { this.requestTeacherList({ cost: e.target.value }) }}
              >
                <Radio value={PRICE_ORDER_OPTIONS.LOW_TO_HIGH}>由低到高</Radio><br />
                <Radio value={PRICE_ORDER_OPTIONS.HIGH_TO_LOW}>由高到低</Radio><br />
              </Radio.Group>
            </div>
            <div className="filter-item-wrap">
              <Button onClick={() => { this.requestTeacherList(this.defaultFilter) }}>清空筛选</Button>
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
                <h3 style={{ textAlign: 'center' }}>没有符合条件的老师~</h3>
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
