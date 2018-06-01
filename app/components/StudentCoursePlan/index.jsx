import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { getImage } from '../../utils'
import { CourseListItem } from '../../components'
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
      <div className="student-course-plan" style={wrapStyle}>
        <div className="my-fav-teachers module-wrap">
          <h5 className="title">我的关注</h5>
          <div className="teacher-name-list list-wrap">
            <a href="javascript:;" className="teacher-name" title="马天驰">马天驰</a>
            <a href="javascript:;" className="teacher-name current" title="Zaha Hadide">Zaha Hadide</a>
            <a href="javascript:;" className="teacher-name" title="马天驰 Zaha Hadide">马天驰 Zaha Hadide</a>
          </div>
        </div>
        <div className="my-teachers  module-wrap">
          <h5 className="title">我的老师</h5>
          <div className="teacher-info-list list-wrap">
            <a href="javascript:;" className="teacher-info">
              <img src={getImage('default-teacher-avatar-470-21-.png')} alt="" />
            </a>
            <a href="javascript:;" className="teacher-info">
              <img src={getImage('default-teacher-avatar-470-21-.png')} alt="" />
            </a>
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
          </div>
        </div>
      </div>
    )
  }
}
