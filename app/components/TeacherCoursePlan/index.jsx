import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Icon } from 'antd'

import { getImage } from '../../utils'
import { CourseListItem, EditNewCourseItem } from '../../components'
import './index.less'

export default class StudentCoursePlan extends Component {
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
      <div className="teacher-course-plan" style={wrapStyle}>
        <div className="my-student module-wrap">
          <h5 className="title">我的学生</h5>
          <div className="teacher-name-list list-wrap">
            <a href="javascript:;" className="teacher-name" title="张赛男">张赛男</a>
            <a href="javascript:;" className="teacher-name current" title="李思思">李思思</a>
            <a href="javascript:;" className="teacher-name" title="王二毛">王二毛啦啦啦</a>
          </div>
        </div>
        <div className="student-info  module-wrap">
          <h5 className="title">学生嘻嘻</h5>
          <div className="student-info-detail">
            <img src={getImage('default-student-avatar-300-400.png')} alt="" className="student-avatar" />
            <div className="student-info-item">
              <span className="info-title">性别</span>
              <span className="info-value">男</span>
            </div>
            <div className="student-info-item">
              <span className="info-title">专业</span>
              <span className="info-value">服装；纺织面料</span>
            </div>
            <div className="student-info-item">
              <span className="info-title">授课形式</span>
              <span className="info-value">不限</span>
            </div>
            <div className="student-info-item">
              <span className="info-title">申请学历</span>
              <span className="info-value">硕士</span>
            </div>
            <div className="student-info-item">
              <span className="info-title">目标院校</span>
              <span className="info-value">LCF；CSM</span>
            </div>
            <div className="student-info-item">
              <span className="info-title">申请国家</span>
              <span className="info-value">美国</span>
            </div>
          </div>
        </div>
        <div className="my-course-list module-wrap">
          <h5 className="title">课程</h5>
          <div className="course-list list-wrap">
            <CourseListItem
              userRole="student"
              courseInfo={{
                order: 1,
                content: '对学生进行评估，讲解专业概况\n制定学习计划和课表，明确学习目标',
                time: '2018/05/03\n上午8:00-9:00',
                finished: true,
                rated: true,
              }}
            />
            <CourseListItem
              userRole="student"
              courseInfo={{
                order: 2,
                content: '对学生进行评估，讲解专业概况\n制定学习计划和课表，明确学习目标',
                time: '2018/05/03\n上午8:00-9:00',
                finished: true,
                rated: false,
              }}
            />
            <CourseListItem
              userRole="student"
              courseInfo={{
                order: 3,
                content: '对学生进行评估，讲解专业概况\n制定学习计划和课表，明确学习目标',
                time: '2018/05/03\n上午8:00-9:00',
                finished: false,
                rated: false,
              }}
            />
            {
              <CourseListItem
                userRole="teacher"
                courseInfo={{
                  order: 2,
                  content: '对学生进行评估，讲解专业概况\n制定学习计划和课表，明确学习目标',
                  time: '2018/05/03\n上午8:00-9:00',
                  finished: false,
                }}
              />
            }
            <EditNewCourseItem />
            <div className="add-course-item">
              <Icon type="plus" />
              <span className="content">增加一节课</span>
            </div>
            <a href="" className="btn-lesson-plan-tip">遇到瓶颈了？看看其他人的教案吧</a>
          </div>
        </div>
      </div>
    )
  }
}
