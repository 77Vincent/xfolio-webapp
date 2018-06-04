import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Icon, Tag } from 'antd'
import uuidv4 from 'uuid/v4'

import { TeacherBasicAccountInfo, TeacherInfoSnapshot } from '../index'
import './index.less'

const commonTags = ['名师', '大牛', '设计师', '建筑师']

export default class StudentProfiles extends Component {
  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  state = {
    showTagInput: false,
    tagList: ['名校毕业', '风趣', '教学经验', '工作经验'],
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  inputTagElem = '';

  handleCLickAddInputTag = () => {
    const newTag = _.trim(this.inputTagElem.value)
    if (newTag !== '') {
      this.handleClickAddTag(newTag)
      this.inputTagElem.value = ''
    }
  }

  handleClickAddTag = (newTag) => {
    this.state.tagList.push(newTag)
    this.setState({
      tagList: this.state.tagList,
    })
  }

  toggleTagInput = () => {
    this.setState({
      showTagInput: !this.state.showTagInput,
    })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="teacher-profiles-wrap" style={wrapStyle}>
        <div className="edit-tag-warp">
          <div className="add-tags-wrap">
            <h5 className="title">添加标签</h5>
            <div className="current-tags-wrap">
              <Button className="btn-show-add-tags" onClick={this.toggleTagInput}>
                <Icon type="plus" />
              </Button>
              {
                _.map(this.state.tagList, (tagInfo, i) => (
                  <Tag closable key={i}>{tagInfo}</Tag>
                ))
              }
            </div>
            {
              this.state.showTagInput === true && (
                <div className="add-tag-input-wrap">
                  <div className="input-tag-wrap">
                    <input className="input-tag" ref={(r) => { this.inputTagElem = r }} placeholder="请输入新标签" />
                    <Button className="btn-add-tag" onClick={this.handleCLickAddInputTag}>
                      <Icon type="plus" />
                    </Button>
                  </div>
                  <div className="common-tags-wrap">
                    <p className="title">常用标签</p>
                    <div className="tags-wrap">
                      {
                        _.map(commonTags, tagInfo => (
                          <Tag
                            onClick={() => {
                              this.handleClickAddTag(tagInfo)
                            }}
                            key={uuidv4()}
                          >
                            {tagInfo}
                          </Tag>
                        ))
                      }
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className="teacher-profile-detail">
          <TeacherInfoSnapshot
            showAppointBtn={false}
            showFavBtn={false}
          />
          <TeacherBasicAccountInfo />
        </div>
      </div>
    )
  }
}
