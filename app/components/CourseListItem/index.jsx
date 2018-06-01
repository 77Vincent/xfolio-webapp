import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Rate, Calendar } from 'antd'
import anime from 'animejs'

import './index.less'

export default class CourseListItem extends Component {
  static propTypes = {
    style: PropTypes.object,
    userRole: PropTypes.oneOf(['teacher', 'student']).isRequired,
    courseInfo: PropTypes.object.isRequired, //  order, content, time, finished, rated
  };

  static defaultProps = {
    style: {},
  };

  state = {
    showRatePanel: false,
    showDatePicker: false,
    courseInfo: this.props.courseInfo,
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

  endCourseProgressElem;
  endCourseProgressAnimation;

  handleClickEndCourseStart = () => {
    if (this.endCourseProgressAnimation === undefined || this.endCourseProgressAnimation.completed === false) {
      this.endCourseProgressAnimation = anime({
        targets: this.endCourseProgressElem,
        width: '100%',
        duration: 1000,
        easing: 'linear',
        complete: () => {
          this.setState({
            courseInfo: _.assign(this.state.courseInfo, {
              finished: true,
              rated: true, // TODO 老师的课程表默认评价过
            }),
          })
        },
      })
    }
  }

  handleClickEndCourseFinish = () => {
    if (this.endCourseProgressAnimation.completed !== true) {
      this.endCourseProgressAnimation.pause()
      this.endCourseProgressElem.style.width = '0px'
    }
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { userRole } = this.props
    const { courseInfo } = this.state

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
        <a
          href="javascript:;"
          className="opera-btn btn-rate"
          onClick={this.handleToggleRatePanel}
        >
          评价
        </a>
      </div>
    )
    const rateCourse = (
      <div className="rate-course-wrap">
        { courseOrder }
        <div className="rate-opera-wrap">
          <div className="rate-wrap">
            <Rate value={3} style={{ fontSize: 25 }} />
          </div>
          <a
            href="javascript:;"
            className="opera-btn btn-submit-rate"
            onClick={this.handleToggleRatePanel}
          >
            确定
          </a>
        </div>
      </div>
    )
    const appointCourseTime = (
      <div className="appoint-course-time">
        { courseOrder }
        <div className="content-wrap">
          { courseContent }
          <a
            href="javascript:;"
            className="opera-btn btn-appoint-time"
            onClick={this.handleToggleDatePicker}
          >
            {'预约\n时间'}
          </a>
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
          <div className="content">
            { courseOrder }
            { courseContentWrap }
          </div>
          <div
            className="end-course-progress-tip"
            ref={(r) => { this.endCourseProgressElem = r }}
          />
        </div>
        <a
          href="javascript:;"
          className="opera-btn btn-end-course"
          onMouseDown={this.handleClickEndCourseStart}
          onMouseUp={this.handleClickEndCourseFinish}
        >
          {'长按\n结课'}
        </a>
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
          userRole === 'teacher' && courseInfo.finished === false && (
            endCourse
          )
        }
      </div>
    )
  }
}
