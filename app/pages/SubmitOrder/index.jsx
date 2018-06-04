import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Icon } from 'antd'
import cx from 'classnames'
import uuidv4 from 'uuid/v4'

import { TeacherInfoSnapshot } from '../../components'
import './index.less'

const courseHours = ['1h', '5h', '10h', '20h']
const coursePrice = 500

export default class SubmitOrder extends Component {
  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  state = {
    courseHoursIndex: 1,
    courseNumber: 1,
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  updateCourseHoursIndex = (i) => {
    this.setState({
      courseHoursIndex: i,
    })
  }

  updateCourseNumber = (n) => {
    this.setState({
      courseNumber: n,
    })
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
              {
                _.map(courseHours, (hours, index) => (
                  <Button
                    className={cx({
                      current: this.state.courseHoursIndex === index,
                    })}
                    onClick={() => {
                      this.updateCourseHoursIndex(index)
                    }}
                    key={uuidv4()}
                  >
                    {hours}
                  </Button>
                ))
              }
            </div>
          </div>
          <div className="order-info-item course-number">
            <p className="title">数量</p>
            <div className="course-number-opera">
              <Button
                className={cx({
                  disabled: this.state.courseNumber === 1,
                })}
                disabled={this.state.courseNumber === 1}
                onClick={() => {
                  this.updateCourseNumber(this.state.courseNumber - 1)
                }}
              >
                <Icon type="minus" />
              </Button>
              <span className="number">{this.state.courseNumber}</span>
              <Button
                onClick={() => {
                  this.updateCourseNumber(this.state.courseNumber + 1)
                }}
              >
                <Icon type="plus" />
              </Button>
            </div>
          </div>
          <p className="order-price">
            <span>总计</span>
            <span
              className="price-number"
            >
              ￥{parseInt(courseHours[this.state.courseHoursIndex], 10) * this.state.courseNumber * coursePrice}
            </span>
          </p>
          <Button className="btn-submit-order">确认支付</Button>
        </div>
      </div>
    )
  }
}
