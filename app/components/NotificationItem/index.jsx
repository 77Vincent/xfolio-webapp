import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import './index.less'

export const NotificationTypes = {
  SUBMIT_ORDER: 'SUBMIT_ORDER',
  CONFIRM_ORDER: 'CONFIRM_ORDER',
  BOOK_COURSE: 'BOOK_COURSE',
  CONFIRM_COURSE: 'CONFIRM_COURSE',
  SELF_CONFIRM_COURSE: 'SELF_CONFIRM_COURSE',
  REFUSE_COURSE: 'REFUSE_COURSE',
}

export default class NotificationItem extends Component {
  static propTypes = {
    style: PropTypes.object,
    type: PropTypes.string,
  };

  static defaultProps = {
    style: {},
    type: '',
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="notification-item" style={wrapStyle}>
        {
          this.props.type === NotificationTypes.SUBMIT_ORDER && (
            <p className="item-detail-wrap item-submit-order">
              <span className="user-name">张三</span>
              <span className="colon">:</span>
              <span className="statement">提交了</span>
              <span className="order-name">20h常规课程</span>
              <span className="statement">订单</span>
            </p>
          )
        }
        {
          this.props.type === NotificationTypes.CONFIRM_ORDER && (
            <p className="item-detail-wrap item-submit-order">
              <span className="user-name">马天驰</span>
              <span className="colon">:</span>
              <span className="statement">确认了您</span>
              <span className="order-name">20h常规课程</span>
              <span className="statement">订单</span>
            </p>
          )
        }
        {
          this.props.type === NotificationTypes.BOOK_COURSE && (
            <p className="item-detail-wrap item-submit-order">
              <span className="user-name">张三</span>
              <span className="colon">:</span>
              <span className="statement">预约了</span>
              <span className="time-format">2018/05/16，上午10:00-11:00的</span>
              <span className="statement">的</span>
              <span className="course-name">首课</span>
            </p>
          )
        }
        {
          this.props.type === NotificationTypes.CONFIRM_COURSE && (
            <p className="item-detail-wrap item-submit-order">
              <span className="user-name">马天驰</span>
              <span className="colon">:</span>
              <span className="statement">确认了您</span>
              <span className="time-format">2018/05/16，上午10:00-11:00</span>
              <span className="statement">的</span>
              <span className="course-name">首课</span>
            </p>
          )
        }
        {
          this.props.type === NotificationTypes.SELF_CONFIRM_COURSE && (
            <p className="item-detail-wrap item-submit-order">
              <span className="user-name">您</span>
              <span className="statement">确认了</span>
              <span className="time-format">2018/05/16，上午10:00-11:00</span>
              <span className="statement">的</span>
              <span className="course-name">首课</span>
            </p>
          )
        }
        {
          this.props.type === NotificationTypes.REFUSE_COURSE && (
            <p className="item-detail-wrap item-submit-order">
              <span className="user-name">马天驰</span>
              <span className="colon">:</span>
              <span className="statement">退回了您</span>
              <span className="time-format">2018/05/10，上午10:00-11:00</span>
              <span className="statement">的</span>
              <span className="course-name">常规课程</span>
              <span className="statement">
                ，可能是由于老师时间临时有事，请另约时间给您带来不便请多谅解
              </span>
            </p>
          )
        }
        <span className="timestamp">今天 12:00</span>
      </div>
    )
  }
}
