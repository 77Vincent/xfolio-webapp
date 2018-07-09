import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Icon, Spin, message } from 'antd'
import cx from 'classnames'
import { connect } from 'react-redux'
import to from 'await-to'

import { USER_ROLE, GENDER_OPTIONS } from '../../Consts'
import { Request, formatClassDate } from '../../utils'
import { ClassListItem, EditNewClassItem } from '../../components'
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

  state = {
    studentList: [],
    currentStudentIndex: 0,
    classes: [],
    getStudentListLoading: true,
    getStudentInfoLoading: true,
    getClassesLoading: true,
  }

  componentDidMount = async () => {
    const studentList = await this.getStudents()
    this.setState({
      getStudentListLoading: false,
      getStudentInfoLoading: false,
    })
    if (studentList.length > 0) {
      await this.getClasses(studentList[0].id)
      this.setState({
        getClassesLoading: false,
      })
    }
  }

  componentWillUnmount() {
  }

  getStudents = async () => {
    // 初始化学生列表
    let studentList = await Request.getStudents(this.props.accountInfo.id).then(res => res.body)
    if (_.isArray(studentList)) {
      this.setState({ studentList })
    } else {
      studentList = []
    }
    return studentList
  }

  getClasses = async (studentInfo) => {
    // 先获取 schedule 再获取 class
    const [getScheduleError, schedules] = await to(Request.getSchedules({
      teacher_id: this.props.accountInfo.id,
      student_id: studentInfo.id,
    }).then(res => res.body))

    /* eslint-disable prefer-destructuring */
    this.scheduleInfo = schedules[0] // TODO 先取第一个 schedule

    if (!getScheduleError && _.isArray(schedules) && schedules.length > 0) {
      const [getClassesError, classes] = await to(Request.getClasses({
        schedule_id: this.scheduleInfo.id,
      }).then(res => res.body))

      if (!getClassesError && _.isArray(classes) && classes.length !== 0) {
        this.setState({
          classes,
        })
      }
    }
  }

  scheduleInfo = {}

  handleSelectStudent = async (i) => {
    this.setState({
      currentStudentIndex: i,
      getStudentInfoLoading: true,
      getClassesLoading: true,
    })
    await this.getClasses(this.state.studentList[i])
    this.setState({
      getStudentInfoLoading: false,
      getClassesLoading: false,
    })
  }

  handleClickAddClass = async () => {
    if (_.isEmpty(this.scheduleInfo) === false) {
      const [err, classInfo] = await to(Request.createClass({
        schedule_id: this.scheduleInfo.id,
      }).then(res => res.body))
      if (!err) {
        this.state.classes.push(classInfo)
        this.setState({
          classes: this.state.classes,
        })
      } else {
        message.success('课程添加失败！')
      }
    }
  }

  handleDeleteClass = (classId) => {
    log('handleDeleteClass ', classId)
    const index = _.findIndex(this.state.classes, ['id', classId])
    if (index !== -1) {
      this.state.classes.splice(index, 1)
      this.setState({
        classes: this.state.classes,
      })
    }
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { studentList, currentStudentIndex, classes } = this.state
    let currentStudent = {}
    if (studentList.length > 0) {
      currentStudent = studentList[currentStudentIndex]
    }

    return (
      <div className="teacher-course-plan" style={wrapStyle}>
        <div className="my-student module-wrap">
          <h5 className="xfolio-text-section-title">我的学生</h5>
          <div className="student-name-list list-wrap">
            {
              this.state.getStudentListLoading ? (
                <Spin />
              ) : (
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
              )
            }
          </div>
        </div>
        <div className="student-info  module-wrap">
          <h5 className="title">学生信息</h5>
          <div className="student-info-detail">
            {
              this.state.getStudentInfoLoading ? (
                <Spin />
              ) : (
                <Fragment>
                  <img
                    src={currentStudent.avatar_id && `/api/avatars/${currentStudent.avatar_id}`}
                    alt="avatar"
                    className="student-avatar"
                  />

                  <div className="xfolio-current-info-wrapper">
                    <span className="xfolio-text-title-s">性别</span>
                    <span className="xfolio-text-info-value">
                      {
                        currentStudent.gender !== null ?
                        GENDER_OPTIONS.filter(each => (Number(currentStudent.gender) === each.value))[0].name :
                        '未设置'
                      }
                    </span>
                  </div>

                  <div className="xfolio-current-info-wrapper">
                    <span className="xfolio-text-title-s">申请学历</span>
                    <span className="xfolio-text-info-value">
                      {
                        currentStudent.degree_id
                          ? constDataHolder.degrees[currentStudent.degree_id].cn
                          : '未设置'
                      }
                    </span>
                  </div>

                  <div className="xfolio-current-info-wrapper">
                    <span className="xfolio-text-title-s">上课地点</span>
                    {
                      currentStudent.places.length ?
                        _.map(currentStudent.places, (each, i) => {
                          return <span className="xfolio-text-info-value" key={i}>{each.cn}</span>
                        }) :
                        <span className="xfolio-text-info-value">未设置</span>
                    }
                  </div>

                  <div className="xfolio-current-info-wrapper">
                    <span className="xfolio-text-title-s">申请专业</span>
                    {
                      currentStudent.majors.length ?
                        _.map(currentStudent.majors, (each, i) => {
                          return <span className="xfolio-text-info-value" key={i}>{each.cn}</span>
                        }) :
                        <span className="xfolio-text-info-value">未设置</span>
                    }
                  </div>


                  <div className="xfolio-current-info-wrapper">
                    <span className="xfolio-text-title-s">目标院校</span>
                    {
                      currentStudent.schools.length ?
                        _.map(currentStudent.schools, (each, i) => {
                          return <span className="xfolio-text-info-value" key={i}>{each.cn}</span>
                        }) :
                        <span className="xfolio-text-info-value">未设置</span>
                    }
                  </div>

                  <div className="xfolio-current-info-wrapper">
                    <span className="xfolio-text-title-s">申请国家</span>
                    {
                      currentStudent.countries.length ?
                        _.map(currentStudent.countries, (each, i) => {
                          return <span className="xfolio-text-info-value" key={i}>{each.cn}</span>
                        }) :
                        <span className="xfolio-text-info-value">未设置</span>
                    }
                  </div>
                </Fragment>
              )
            }
          </div>
        </div>
        <div className="my-class-list module-wrap">
          <div className="class-list list-wrap">
            <h5 className="xfolio-text-section-title">课程表</h5>
            {
              this.state.getClassesLoading ? (
                <Spin />
              ) : (
                <Fragment>
                  {
                    _.map(classes, (classInfo, index) => {
                      // 未编辑完 或者 未预约 的课程都显示为编辑状态
                      if (_.isEmpty(classInfo.courses) === false && classInfo.date !== null) {
                        const classContent = (
                          _.reduce(classInfo.courses, (r, v) => {
                            r.push(v.label)
                            return r
                          }, []).join('\n')
                        )
                        return (
                          <ClassListItem
                            userRole={USER_ROLE.TEACHER}
                            classInfo={{
                              id: classInfo.id,
                              order: index + 1,
                              content: classContent,
                              date: formatClassDate(new Date(classInfo.date).getTime(), classInfo.length),
                              finished: classInfo.finished,
                            }}
                            key={index}
                          />
                        )
                      }
                      return (
                        <EditNewClassItem
                          classInfo={{
                            order: index + 1,
                            ...classInfo,
                          }}
                          onDelete={this.handleDeleteClass}
                          key={index}
                        />
                      )
                    })
                  }
                  <div className="add-course-item" onClick={this.handleClickAddClass} role="button" tabIndex={0}>
                    <Icon type="plus" />
                    <span className="content">增加一节课</span>
                  </div>
                  <a href="" className="btn-lesson-plan-tip">遇到瓶颈了？看看其他人的教案吧</a>
                </Fragment>
              )
            }
          </div>

          <div>
            <h5 className="xfolio-text-section-title">我创建的课程</h5>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accountInfo: state.AccountInfo,
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCoursePlan)
