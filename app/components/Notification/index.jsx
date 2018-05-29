import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

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
        </div>
        <div className="notification-item-wrap">
          <NotificationItem
            type={NotificationTypes.CONFIRM_COURSE}
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
