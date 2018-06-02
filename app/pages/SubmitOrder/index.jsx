import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Icon } from 'antd'

import { TeacherInfoSnapshot } from '../../components'
import './index.less'

export default class SubmitOrder extends Component {
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
      <div className="submit-order-wrap" style={wrapStyle}>
        <TeacherInfoSnapshot
          showAppointBtn={false}
        />
        <div className="order-detail-wrap">
          <div className="order-info-item teacher-price">
            <p className="title">课时单价</p>
            <p className="price">¥500/h</p>
          </div>
          <div className="order-info-item course-package">
            <p className="title">课程包</p>
            <div className="course-number-options">
              <Button>1h</Button>
              <Button className="current">5h</Button>
              <Button>10h</Button>
              <Button>20h</Button>
            </div>
          </div>
          <div className="order-info-item course-number">
            <p className="title">数量</p>
            <div className="course-number-opera">
              <Button className="disabled" disabled>
                <Icon type="minus" />
              </Button>
              <span className="number">2</span>
              <Button>
                <Icon type="plus" />
              </Button>
            </div>
          </div>
          <p className="order-price">
            <span>总计</span>
            <span className="price-number">￥5000</span>
          </p>
          <Button className="btn-submit-order">确认支付</Button>
        </div>
      </div>
    )
  }
}
