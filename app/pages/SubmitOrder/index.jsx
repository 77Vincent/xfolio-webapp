import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Card } from 'antd'
import cx from 'classnames'
import uuidv4 from 'uuid/v4'
import queryString from 'query-string'

import { TeacherInfoSnapshot } from '../../components'
import { Request } from '../../utils'
import './index.less'

const courseHours = ['1h', '5h', '10h', '20h']

export default class SubmitOrder extends Component {
  static propTypes = {
    style: PropTypes.object,
    location: PropTypes.object.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  state = {
    teacherInfoInited: false,
    teacherInfo: {},
    courseHoursIndex: 1,
    courseCount: 1,
  }

  componentDidMount() {
    const urlSearch = queryString.parse(this.props.location.search.substring(1))
    if (urlSearch.userId !== undefined) {
      Request.getUserInfo(urlSearch.userId).then((res) => {
        this.setState({
          teacherInfoInited: true,
          teacherInfo: res.body,
        })
      })
    }
  }

  updateCourseHoursIndex = (i) => {
    this.setState({
      courseHoursIndex: i,
    })
  }

  updateCourseCount = (n) => {
    this.setState({
      courseCount: n,
    })
  }

  calcCourseLength = () => {
    return parseInt(courseHours[this.state.courseHoursIndex], 10) * this.state.courseCount
  }

  calcTotalPrice = () => {
    return this.calcCourseLength() * this.state.teacherInfo.cost
  }

  handleClickSubmitOrder = () => {
    Request.createOrder({
      payment_method: 1,
      total_price: this.calcTotalPrice(),
      unit_price: this.state.teacherInfo.cost,
      length: this.calcCourseLength(),
      recipient_id: this.state.teacherInfo.id,
    }).then((res) => {
      log('createOrder res ', res)
    }).catch((e) => {
      log('createOrder err ', e)
    })
  }

  render() {
    const { courseCount, courseHoursIndex } = this.state

    return (
      <div className="submit-order-wrap" style={this.props.style}>
        <Card
          loading={this.state.teacherInfoInited === false}
          bordered={false}
          bodyStyle={{
            margin: 0,
          }}
        >
          <TeacherInfoSnapshot
            teacherInfo={this.state.teacherInfo}
            showFavBtn={false}
            showAppointBtn={false}
          />
          <div className="order-detail-wrap">
            <div className="order-info-item teacher-price">
              <p className="title">课时单价</p>
              <p className="price">¥{this.state.teacherInfo.cost}/h</p>
            </div>
            <div className="order-info-item course-package">
              <p className="title">课程包</p>
              <div className="course-number-options">
                {
                  courseHours.map((hours, index) => (
                    <Button
                      className={cx({
                        current: courseHoursIndex === index,
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
                    disabled: courseCount === 1,
                  })}
                  disabled={courseCount === 1}
                  onClick={() => {
                    this.updateCourseCount(courseCount - 1)
                  }}
                >
                  <Icon type="minus" />
                </Button>
                <span className="number">{courseCount}</span>
                <Button
                  onClick={() => {
                    this.updateCourseCount(courseCount + 1)
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
              ￥{this.calcTotalPrice()}
              </span>
            </p>
            <Button className="btn-submit-order" onClick={this.handleClickSubmitOrder}>确认支付</Button>
          </div>
        </Card>
      </div>
    )
  }
}
