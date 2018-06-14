import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Icon } from 'antd'
import cx from 'classnames'
import { connect } from 'react-redux'

import { USER_ROLE, COURSE_PLACE_OPTIONS, GENDER_OPTIONS_NORMALIZED } from '../../Consts'
import { Request } from '../../utils'
import { CourseListItem, EditNewCourseItem } from '../../components'
import './index.less'
import constDataHolder from '../../store/constDataHolder'

class TeacherCoursePlan extends Component {
  static propTypes = {
    style: PropTypes.object,
    accountInfo: PropTypes.object.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props)
    // 初始化学生列表
    Request.getStudents(this.props.accountInfo.id).then((res) => {
      this.setState({
        studentList: JSON.parse(res.text),
      })
    })
  }

  state = {
    studentList: [],
    currentStudentIndex: 0,
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleSelectStudent = (i) => {
    this.setState({
      currentStudentIndex: i,
    })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { studentList, currentStudentIndex } = this.state
    let currentStudentInfo = {}
    if (studentList.length > 0) {
      currentStudentInfo = studentList[currentStudentIndex]
    }
    log('currentStudentInfo ', currentStudentInfo)

    return (
      <div className="teacher-course-plan" style={wrapStyle}>
        <div className="my-student module-wrap">
          <h5 className="title">我的学生</h5>
          <div className="student-name-list list-wrap">
            {
              _.map(studentList, (studentInfo, index) => (
                <a
                  href="javascript:;"
                  className={cx({
                    'student-name': true,
                    current: index === currentStudentIndex,
                  })}
                  title={studentInfo.name}
                  key={index}
                  onClick={() => {
                    this.handleSelectStudent(index)
                  }}
                >
                  {studentInfo.name}
                </a>
              ))
            }
          </div>
        </div>
        <div className="student-info  module-wrap">
          <h5 className="title">学生信息</h5>
          <div className="student-info-detail">
            <img src={`/api/avatars/${currentStudentInfo.avatar_id}`} alt="" className="student-avatar" />
            <div className="student-info-item">
              <span className="info-title">性别</span>
              <span className="info-value">
                {
                  _.isNil(currentStudentInfo.gender) === false
                    ? GENDER_OPTIONS_NORMALIZED[Number(currentStudentInfo.gender)].name
                    : '未设置'
                }
              </span>
            </div>
            <div className="student-info-item">
              <span className="info-title">专业</span>
              <span className="info-value">{currentStudentInfo.majors || '未设置'}</span>
            </div>
            <div className="student-info-item">
              <span className="info-title">授课形式</span>
              <span className="info-value">
                {
                  currentStudentInfo.place
                    ? COURSE_PLACE_OPTIONS[currentStudentInfo.place].name
                    : '未设置'
                }
              </span>
            </div>
            <div className="student-info-item">
              <span className="info-title">申请学历</span>
              <span className="info-value">
                {
                  currentStudentInfo.degree_id
                    ? constDataHolder.degrees[currentStudentInfo.degree_id].cn
                    : '未设置'
                }
              </span>
            </div>
            <div className="student-info-item">
              <span className="info-title">目标院校</span>
              <span className="info-value">{currentStudentInfo.school || '未设置'}</span>
            </div>
            <div className="student-info-item">
              <span className="info-title">申请国家</span>
              <span className="info-value">
                {
                  currentStudentInfo.country
                    ? constDataHolder.countriesNormalized[currentStudentInfo.country].cn
                    : '未设置'
                }
              </span>
            </div>
          </div>
        </div>
        <div className="my-course-list module-wrap">
          <h5 className="title">课程</h5>
          <div className="course-list list-wrap">
            <CourseListItem
              userRole={USER_ROLE.TEACHER}
              courseInfo={{
                order: 1,
                content: '对学生进行评估，讲解专业概况\n制定学习计划和课表，明确学习目标',
                time: '2018/05/03\n上午8:00-9:00',
                finished: true,
                rated: true,
              }}
            />
            <CourseListItem
              userRole={USER_ROLE.TEACHER}
              courseInfo={{
                order: 2,
                content: '对学生进行评估，讲解专业概况\n制定学习计划和课表，明确学习目标',
                time: '2018/05/03\n上午8:00-9:00',
                finished: false,
              }}
            />
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

const mapStateToProps = state => ({
  accountInfo: state.AccountInfo,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCoursePlan)
