import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Icon, Tag } from 'antd'
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'

import { TeacherBasicAccountInfo, TeacherInfoSnapshot } from '../index'
import { Request } from '../../utils'
import './index.less'

const commonTags = [
  {
    id: 3,
    content: '专业',
  },
  {
    id: 4,
    content: '口才好',
  },
  {
    id: 5,
    content: '和蔼可亲',
  },
  {
    id: 6,
    content: '闷骚',
  },
]

class TeachersProfiles extends Component {
  static propTypes = {
    style: PropTypes.object,
    accountInfo: PropTypes.object.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  state = {
    showTagInput: false,
    tagList: [
      {
        id: 13,
        content: '经历丰富',
      },
      {
        id: 14,
        content: '123',
      },
      {
        id: 15,
        content: '123123',
      },
    ],
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

  handleClickAddTag = (tagContent) => {
    Request.createTag(this.props.accountInfo.id, tagContent).then((res) => {
      const tagInfo = JSON.parse(res.text)
      this.state.tagList.push({
        id: tagInfo.id,
        content: tagInfo.content,
      })
      this.setState({
        tagList: this.state.tagList,
      })
    })
  }

  toggleTagInput = () => {
    this.setState({
      showTagInput: !this.state.showTagInput,
    })
  }

  handleDeleteTag = (tagId) => {
    Request.removeTag(tagId).then(() => {
      const index = _.findIndex(this.state.tagList, ['id', tagId])
      if (index !== -1) {
        this.state.tagList.splice(index, 1)
        this.setState({
          tagList: this.state.tagList,
        })
      }
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
                _.map(this.state.tagList, tagInfo => (
                  <Tag
                    closable
                    key={tagInfo.id}
                    afterClose={() => {
                      this.handleDeleteTag(tagInfo.id)
                    }}
                  >
                    {tagInfo.content}
                  </Tag>
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
                              this.handleClickAddTag(tagInfo.content)
                              _.remove(commonTags, (tag) => {
                                return tag.id === tagInfo.id
                              })
                              this.forceUpdate() // TODO 临时测试使用
                            }}
                            key={tagInfo.id}
                          >
                            {tagInfo.content}
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
            teacherInfo={this.props.accountInfo}
            showAppointBtn={false}
            showFavBtn={false}
          />
          <TeacherBasicAccountInfo />
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

export default connect(mapStateToProps, mapDispatchToProps)(TeachersProfiles)
