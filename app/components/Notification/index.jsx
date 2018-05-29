import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button } from 'antd'

import { NotificationItem } from '../index'
import { NotificationTypes } from '../NotificationItem/index'
import './index.less'

export default class Notification extends Component {
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
      <div className="notification-wrap" style={wrapStyle}>
        <div className="notification-item-wrap">
          <NotificationItem
            type={NotificationTypes.SUBMIT_ORDER}
          />
        </div>
        <div className="notification-item-wrap">
          <NotificationItem
            type={NotificationTypes.CONFIRM_ORDER}
          />
        </div>
        <div className="notification-item-wrap">
          <NotificationItem
            type={NotificationTypes.BOOK_COURSE}
          />
          <div className="opera-wrap">
            <span className="left-refuse-times">
              剩余退回
              <span className="number">3</span>
              次数
            </span>
            <Button className="opera-btn">退回</Button>
            <Button className="opera-btn">确认</Button>
          </div>
        </div>
        <div className="notification-item-wrap">
          <NotificationItem
            type={NotificationTypes.CONFIRM_COURSE}
          />
        </div>
        <div className="notification-item-wrap">
          <NotificationItem
            type={NotificationTypes.SELF_CONFIRM_COURSE}
          />
        </div>
        <div className="notification-item-wrap">
          <NotificationItem
            type={NotificationTypes.REFUSE_COURSE}
          />
        </div>

        <div className="notification-item-wrap">
          <NotificationItem
            type={NotificationTypes.REFUSE_COURSE}
          />
        </div>
        <div className="notification-item-wrap">
          <NotificationItem
            type={NotificationTypes.REFUSE_COURSE}
          />
        </div>
        <div className="notification-item-wrap">
          <NotificationItem
            type={NotificationTypes.REFUSE_COURSE}
          />
        </div>
        <div className="notification-item-wrap">
          <NotificationItem
            type={NotificationTypes.REFUSE_COURSE}
          />
        </div>
        <div className="notification-item-wrap">
          <NotificationItem
            type={NotificationTypes.REFUSE_COURSE}
          />
        </div>
      </div>
    )
  }
}
