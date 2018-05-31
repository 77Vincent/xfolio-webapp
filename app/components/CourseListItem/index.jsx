import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Rate, Calendar } from 'antd'

import './index.less'

export default class CourseListItem extends Component {
  static propTypes = {
    style: PropTypes.object,
    userRole: PropTypes.oneOf(['teacher', 'student']).isRequired,
    courseInfo: PropTypes.object.isRequired, //  order, content, time, finished, rated
  };

  static defaultProps = {
    style: {},
    showDatePicker: false,
  };

  state = {
    showRatePanel: false,
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleToggleRatePanel = () => {
    this.setState({
      showRatePanel: !this.state.showRatePanel,
    })
  }

  handleToggleDatePicker = () => {
    this.setState({
      showDatePicker: !this.state.showDatePicker,
    })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { courseInfo, userRole } = this.props

    // 公共
    const courseOrder = (
      <div className="course-order">{ courseInfo.order }</div>
    )
    const courseContent = (
      <span className="course-content">{ courseInfo.content }</span>
    )
    const courseTime = (
      <span className="course-time">{ courseInfo.time }</span>
    )
    const courseContentWrap = (
      <div className="course-content-wrap">
        { courseContent }
        { courseTime }
      </div>
    )

    // 学生
    const courseFinishedAndRated = (
      <div className="course-finished-rated">
        { courseOrder }
        { courseContentWrap }
      </div>
    )
    const courseFinishedAndNotRated = (
      <div className="course-finished-not-rated">
        { courseOrder }
        { courseContentWrap }
        <a href="javascript:;" className="opera-btn btn-rate" onClick={this.handleToggleRatePanel}>评价</a>
      </div>
    )
    const rateCourse = (
      <div className="rate-course-wrap">
        { courseOrder }
        <div className="rate-opera-wrap">
          <div className="rate-wrap">
            <Rate value={3} style={{ fontSize: 25 }} />
          </div>
          <a href="javascript:;" className="opera-btn btn-submit-rate" onClick={this.handleToggleRatePanel}>确定</a>
        </div>
      </div>
    )
    const appointCourseTime = (
      <div className="appoint-course-time">
        { courseOrder }
        <div className="content-wrap">
          { courseContent }
          <a href="javascript:;" className="opera-btn btn-appoint-time" onClick={this.handleToggleDatePicker}>预约时间</a>
        </div>
        {
          this.state.showDatePicker && (
            <div className="date-picker-wrap">
              <Calendar fullscreen={false} />
            </div>
          )
        }
      </div>
    )

    // 老师
    const endCourse = (
      <div className="end-course-wrap">
        <div className="content-wrap">
          { courseOrder }
          { courseContentWrap }
          <div className="end-course-progress-tip" />
        </div>
        <a href="javascript:;" className="opera-btn btn-end-course">长按节课</a>
      </div>
    )

    return (
      <div className="course-list-item" style={wrapStyle}>
        {
          courseInfo.finished === true && courseInfo.rated === true && (
            courseFinishedAndRated
          )
        }
        {
          userRole === 'student' && (
            <Fragment>
              {
                courseInfo.finished === true && courseInfo.rated === false && (
                  <Fragment>
                    {
                      this.state.showRatePanel === false && (
                        courseFinishedAndNotRated
                      )
                    }
                    {
                      this.state.showRatePanel === true && (
                        rateCourse
                      )
                    }
                  </Fragment>
                )
              }
              {
                userRole === 'student' && courseInfo.finished === false && (
                  appointCourseTime
                )
              }
            </Fragment>
          )
        }
        {
          userRole === 'teacher' && (
            endCourse
          )
        }
      </div>
    )
  }
}
