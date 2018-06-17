import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Rate, Calendar, message } from 'antd'
import anime from 'animejs'
import to from 'await-to'

import { USER_ROLE } from '../../Consts'
import './index.less'
import { Request } from '../../utils'

export default class ClassListItem extends Component {
  static propTypes = {
    style: PropTypes.object,
    userRole: PropTypes.oneOf([USER_ROLE.STUDENT, USER_ROLE.TEACHER]).isRequired,
    classInfo: PropTypes.object.isRequired, //  order, content, time, finished, rated
  };

  static defaultProps = {
    style: {},
  };

  state = {
    showRatePanel: false,
    showDatePicker: false,
    classInfo: this.props.classInfo,
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
        complete: async () => {
          // 结束课程
          const [err] = await to(Request.updateClass(this.props.classInfo.id, { finished: true }))
          if (!err) {
            message.success('课程结束成功！')
            this.setState({
              classInfo: _.assign(this.state.classInfo, {
                finished: true,
                rated: true,
              }),
            })
          } else {
            message.error('课程结束失败！')
          }
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
    const { classInfo } = this.state

    // 公共
    const courseOrder = (
      <div className="course-order">{ classInfo.order }</div>
    )
    const courseContent = (
      <span className="course-content">{ classInfo.content }</span>
    )
    const courseTime = (
      <span className="course-time">{ classInfo.date }</span>
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
      <div className="class-list-item" style={wrapStyle}>
        {
          userRole === USER_ROLE.STUDENT && (
            <Fragment>
              {
                classInfo.finished === true ? (
                  <Fragment>
                    {
                      classInfo.rated === false ? (
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
                      ) : (
                        courseFinishedAndRated
                      )
                    }
                  </Fragment>
                ) : (
                  appointCourseTime
                )
              }
            </Fragment>
          )
        }
        {
          userRole === USER_ROLE.TEACHER && (
            <Fragment>
              {
                classInfo.finished === true ? (
                  courseFinishedAndRated
                ) : (
                  endCourse
                )
              }
            </Fragment>
          )
        }
      </div>
    )
  }
}
