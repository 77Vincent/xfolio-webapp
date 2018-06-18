import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Rate, Calendar, message } from 'antd'
import anime from 'animejs'
import to from 'await-to'

import { USER_ROLE } from '../../Consts'
import { Request } from '../../utils'
import './index.less'

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

  endClassProgressElem;
  endClassProgressAnimation;

  handleClickEndClassStart = () => {
    if (this.endClassProgressAnimation === undefined || this.endClassProgressAnimation.completed === false) {
      this.endClassProgressAnimation = anime({
        targets: this.endClassProgressElem,
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

  handleClickEndClassFinish = () => {
    if (this.endClassProgressAnimation.completed !== true) {
      this.endClassProgressAnimation.pause()
      this.endClassProgressElem.style.width = '0px'
    }
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { userRole } = this.props
    const { classInfo } = this.state

    // 公共
    const classOrder = (
      <div className="class-order">{ classInfo.order }</div>
    )
    const classContent = (
      <span className="class-content">{ classInfo.content }</span>
    )
    const classTime = (
      <span className="time-format">{ classInfo.date }</span>
    )
    const classContentWrap = (
      <div className="class-content-wrap">
        { classContent }
        { classTime }
      </div>
    )

    // 学生
    const classFinishedAndRated = (
      <div className="class-finished-rated">
        { classOrder }
        { classContentWrap }
        <span className="class-finished-tip">{'已\n结\n课'}</span>
      </div>
    )
    const classFinishedAndNotRated = (
      <div className="class-finished-not-rated">
        { classOrder }
        { classContentWrap }
        <a
          href="javascript:;"
          className="opera-btn btn-rate"
          onClick={this.handleToggleRatePanel}
        >
          评价
        </a>
      </div>
    )
    const rateClass = (
      <div className="rate-class-wrap">
        { classOrder }
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
    const appointClassTime = (
      <div className="appoint-class-time">
        { classOrder }
        <div className="content-wrap">
          { classContent }
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
    const endClass = (
      <div className="end-class-wrap">
        <div className="content-wrap">
          <div className="content">
            { classOrder }
            { classContentWrap }
          </div>
          <div
            className="end-class-progress-tip"
            ref={(r) => { this.endClassProgressElem = r }}
          />
        </div>
        <a
          href="javascript:;"
          className="opera-btn btn-end-class"
          onMouseDown={this.handleClickEndClassStart}
          onMouseUp={this.handleClickEndClassFinish}
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
                              classFinishedAndNotRated
                            )
                          }
                          {
                            this.state.showRatePanel === true && (
                              rateClass
                            )
                          }
                        </Fragment>
                      ) : (
                        classFinishedAndRated
                      )
                    }
                  </Fragment>
                ) : (
                  appointClassTime
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
                  classFinishedAndRated
                ) : (
                  endClass
                )
              }
            </Fragment>
          )
        }
      </div>
    )
  }
}
