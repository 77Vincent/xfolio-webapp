import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { message, Modal, Radio, Select, Spin, Form, Input } from 'antd'
import to from 'await-to'

import { formatClassDate, Request } from '../../utils'
import SelectMultiple from '../SelectMultiple'
import './index.less'

class EditNewClassItem extends Component {
  static propTypes = {
    style: PropTypes.object,
    classInfo: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  state = {
    showEditCourseModal: false,
    modalMode: 'search', // search, create
    fetchingCourses: false,
    searchCourseOptions: [],
    selectedCourses: [],
  }

  newClassItemElem

  toggleShowEditCoursePopup = () => {
    this.setState({
      showEditCourseModal: !this.state.showEditCourseModal,
    })
  }

  handleInputChange = (e) => {
    const contentInput = e.target.value
    this.limitRequestCourses(contentInput)
  }

  limitRequestCourses = _.debounce(async (search) => {
    const [err, courses] = await to(Request.searchCourse({ search }).then(res => res.body))
    if (!err && _.isArray(courses) && courses.length > 0) {
      // TODO 处理获取到的 courses
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
      this.props.onDelete(this.props.classInfo.id)
    }
  }

  handleSelectModalMode = (e) => {
    this.setState({
      modalMode: e.target.value,
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="edit-new-class-item" style={this.props.style} ref={(r) => { this.newClassItemElem = r }}>
        <div className="new-course-content-wrap">
          <div className="class-order">{this.props.classInfo.order}</div>
          <div className="content-wrap">
            <div className="class-content-wrap">
              <div className="class-content">
                {
                  _.isEmpty(this.state.selectedCourses) === false ? (
                    _.reduce(this.state.selectedCourses, (r, v) => {
                      r.push(v.label)
                      return r
                    }, []).join('\n')
                  ) : (
                    <a href="javascript:;" className="btn-add-courses" onClick={this.toggleShowEditCoursePopup}>添加课程</a>
                  )
                }
              </div>
              <div className="class-time">
                {
                  _.isNil(this.props.classInfo.date) ? (
                    <a href="javascript:;" className="btn-set-date">设置时间</a>
                  ) : (
                    <span className="time-format">
                      {formatClassDate(new Date(this.props.classInfo.date).getTime(), this.props.classInfo.length)}
                    </span>
                  )
                }
              </div>
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
        <Modal
          className="edit-class-courses-modal"
          title="添加课程"
          visible={this.state.showEditCourseModal}
          onOk={this.toggleShowEditCoursePopup}
          onCancel={this.toggleShowEditCoursePopup}
        >
          <Radio.Group
            value={this.state.modalMode}
            onChange={this.handleSelectModalMode}
            style={{ marginBottom: 16 }}
          >
            <Radio.Button value="search">从已有课程库里添加</Radio.Button>
            <Radio.Button value="create">创建我的课程</Radio.Button>
          </Radio.Group>
          <div className="modal-body-wrap">
            {
              this.state.modalMode === 'search' && (
                <div className="search-courses-wrap">
                  <div className="select-major-wrap">
                    <p className="title">按专业筛选</p>
                    <SelectMultiple />
                  </div>
                  <div className="search-course">
                    <p className="title">搜索课程关键词</p>
                    <Select
                      mode="multiple"
                      placeholder="请输入关键词"
                      notFoundContent={this.state.fetchingCourses ? <Spin size="small" /> : null}
                      labelInValue
                      value={this.state.value}
                      filterOption={false}
                      onSearch={this.handleInputChange}
                      onChange={this.handleOptionChange}
                    >
                      {
                        _.map(this.state.searchCourseOptions, (courseInfo, index) => {
                          return (
                            <Select.Option value={courseInfo.value} key={index}>{courseInfo.name}</Select.Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                </div>
              )
            }
            {
              this.state.modalMode === 'create' && (
                <div className="create-courses-wrap">
                  <Form
                    layout="horizontal"
                  >
                    <Form.Item
                      label="课程名称"
                      colon={false}
                      labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 20,
                      }}
                    >
                      {
                        getFieldDecorator('course-title')(<Input
                          placeholder="请输入课程名称"
                        />)
                      }
                    </Form.Item>
                    <Form.Item
                      label="课程简介"
                      colon={false}
                      labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 20,
                      }}
                    >
                      {
                        getFieldDecorator('course-description')(<Input.TextArea
                          autosize={false}
                          placeholder="请输入课程简介"
                        />)
                      }
                    </Form.Item>
                    <Form.Item
                      label="适用专业"
                      colon={false}
                      labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 20,
                      }}
                    >
                      {
                        getFieldDecorator('course-majors')(<SelectMultiple />)
                      }
                    </Form.Item>
                  </Form>
                </div>
              )
            }
          </div>
        </Modal>
      </div>
    )
  }
}

const EditNewClassItemWrapped = Form.create()(EditNewClassItem)

export default EditNewClassItemWrapped
