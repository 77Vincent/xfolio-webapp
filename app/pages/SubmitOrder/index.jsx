import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Icon, Card } from 'antd'
import cx from 'classnames'
import uuidv4 from 'uuid/v4'
import queryString from 'query-string'

import { TeacherInfoSnapshot } from '../../components'
import { Request } from '../../utils'
import './index.less'

const courseHours = ['1h', '5h', '10h', '20h']
const coursePrice = 500

export default class SubmitOrder extends Component {
  static propTypes = {
    style: PropTypes.object,
    location: PropTypes.object.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  state = {
    teacherInfoInited: false,
    teacherInfo: {},
    courseHoursIndex: 1,
    courseNumber: 1,
  }

  componentDidMount() {
    const urlSearch = queryString.parse(this.props.location.search.substring(1))
    if (urlSearch.userId !== undefined) {
      Request.getUserInfo(urlSearch.userId).then((res) => {
        this.setState({
          teacherInfoInited: true,
          teacherInfo: JSON.parse(res.text),
        })
      })
    }
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
        </Card>
      </div>
    )
  }
}
