import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Calendar } from 'antd'

import PriceDetail from './PriceDetail'
import './index.less'

export default class TeacherCalendarAndPrice extends Component {
  static propTypes = {
    style: PropTypes.object,
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

    return (
      <div className="teacher-calendar-and-price-wrap" style={wrapStyle}>
        <div className="calendar-wrap">
          <h5 className="calendar-title">时间安排</h5>
          <p className="calendar-tip">请至少填写您当月可用于教学的时间表</p>
          <div className="calendar-detail">
            <Calendar
              fullscreen={false}
            />
          </div>
        </div>
        <div className="price-wrap">
          <h5 className="price-title">费用设置</h5>
          <div className="price-detail-wrap">
            <PriceDetail
              type="线上授课费用"
              price={500}
            />
            <PriceDetail
              type="线下授课费用"
              price={600}
            />
          </div>
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
