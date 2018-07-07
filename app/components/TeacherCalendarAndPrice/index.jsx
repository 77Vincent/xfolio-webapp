import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Calendar } from 'antd'
import { connect } from 'react-redux'

import PriceDetail from './PriceDetail'
import './index.less'

class TeacherCalendarAndPrice extends Component {
  static propTypes = {
    style: PropTypes.object,
    accountInfo: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { accountInfo } = this.props

    return (
      <div className="teacher-calendar-and-price-wrap" style={wrapStyle}>
        <div className="calendar-wrap">
          <h5 className="xfolio-text-info-title">时间安排</h5>
          <p className="calendar-tip">请至少填写您当月可用于教学的时间表</p>
          <div className="calendar-detail">
            <Calendar
              fullscreen={false}
              disabledDate={(targetDate, currentDate) => {
                return targetDate.month() !== currentDate.month()
              }}
            />
          </div>
        </div>

        <div className="price-wrap">
          <h5 className="xfolio-text-info-title">费用设置</h5>

          <PriceDetail
            price={accountInfo.cost}
            onSubmit={(cost) => {
              this.props.updateUser({
                userId: accountInfo.id,
                payload: { cost },
              })
            }}
          />

          <p className="share-tip">
            当前费用的
            <span className="high-light"> 30% </span>
            将作为平台维护费用。
            <a href="" className="share-link">太多了？我想降低分成</a>
          </p>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCalendarAndPrice)
