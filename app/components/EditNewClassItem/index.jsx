import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Tag, Icon, message } from 'antd'
import to from 'await-to'

import { Request } from '../../utils'
import './index.less'

export default class EditNewClassItem extends Component {
  static propTypes = {
    style: PropTypes.object,
    classInfo: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  state = {
    contentInput: '',
    courses: [],
    selectedCourses: this.props.classInfo.courses || [],
    showEditContentPopUp: false,
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleClickBody)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickBody)
  }

  newClassItemElem

  handleClickBody = (e) => {
    if (this.newClassItemElem.contains(e.target) === false) {
      this.setState({
        showEditContentPopUp: false,
      })
    }
  }

  toggleShowContentPopup = () => {
    this.setState({
      showEditContentPopUp: !this.state.showEditContentPopUp,
    })
  }

  handleInputChange = (e) => {
    const contentInput = e.target.value
    this.setState({
      contentInput,
    })
    this.limitRequestCourses(contentInput)
  }

  limitRequestCourses = _.debounce(async (search) => {
    const [err, courses] = await to(Request.searchCourse({ search }).then(res => res.body))
    if (!err && _.isArray(courses) && courses.length > 0) {
      this.setState({
        courses,
      })
    }
  }, 100)

  handleSelectCourse = async (courseInfo) => {
    const index = _.findIndex(this.state.selectedCourses, ['id', courseInfo.id])
    if (index === -1) {
      await Request.addCourseForClass({
        class_id: this.props.classInfo.id,
        course_id: courseInfo.id,
      })
      this.state.selectedCourses.push(courseInfo)
      this.setState({
        selectedCourses: this.state.selectedCourses,
      })
      message.warning('添加成功！')
    } else {
      message.warning('重复的课程！')
    }
  }

  handleClickDeleteClass = async () => {
    const [err] = await to(Request.deleteClass(this.props.classInfo.id))
    if (err) {
      message.error('删除失败！')
    } else {
      message.success('删除成功！')
      this.props.onDelete(this.props.classInfo.id)
    }
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="edit-new-class-item" style={wrapStyle} ref={(r) => { this.newClassItemElem = r }}>
        <div className="new-course-content-wrap">
          <div className="button-wrap">
            <a className="add-course-content" onClick={this.toggleShowContentPopup} role="button" tabIndex={0}>
              <Icon type="plus" />
            </a>
          </div>
          <div className="content-wrap">
            <div className="course-content-wrap">
              <span className="course-content">
                {
                  _.reduce(this.state.selectedCourses, (r, v) => {
                    r.push(v.label)
                    return r
                  }, []).join('\n')
                }
              </span>
              {
                _.isEmpty(this.props.classInfo.courses) === false && (
                  <span className="course-time">未预约</span>
                )
              }
            </div>
            <a
              href="javascript:;"
              className="btn-delete"
              onClick={this.handleClickDeleteClass}
            >
              删除
            </a>
          </div>
        </div>
        {
          this.state.showEditContentPopUp && (
            <div className="add-course-content-popup">
              <div className="input-wrap">
                <input
                  type="text"
                  value={this.state.contentInput}
                  className="input-content"
                  onChange={this.handleInputChange}
                  placeholder="请输入内容"
                />
                <a
                  href="javascript:;"
                  className="btn-add-content"
                  onClick={this.toggleShowContentPopup}
                  role="button"
                  tabIndex={0}
                >
                  <Icon type="plus" />
                </a>
              </div>
              <div className="content-list">
                {
                  _.map(this.state.courses, (courseInfo, index) => {
                    const search = this.state.contentInput
                    const resultElem = <span className="content-tem" key={index} />
                    let resultContent = courseInfo.label
                    if (search !== '') {
                      // 高亮搜索词 TODO 目前只支持一个搜索词高亮
                      let result = courseInfo.label.split(search)
                      if (result.length > 1) {
                        result = _.reduce(result, (r, v, i) => {
                          r.push(<span key={i}>{v}</span>)
                          r.push(<span className="high-light" key={`${i}-high`}>{search}</span>)
                          return r
                        }, [])
                        result.pop() // 去掉最后一个多余的
                        resultContent = result
                      }
                    }
                    return React.cloneElement(resultElem, {
                      onClick: this.handleSelectCourse.bind(null, courseInfo),
                    }, resultContent)
                  })
                }
              </div>
              {
                false && (
                  <div className="content-tag-wrap">
                    <p className="title">选择内容标签</p>
                    <div className="tags-wrap">
                      <Tag className="tag current">调研</Tag>
                      <Tag className="tag">概念</Tag>
                      <Tag className="tag">软件</Tag>
                      <Tag className="tag">设计方法</Tag>
                      <Tag className="tag">表达形式</Tag>
                      <Tag className="tag">学习习惯</Tag>
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    )
  }
}
