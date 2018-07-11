import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Tag, message } from 'antd'
import { connect } from 'react-redux'
import _ from 'lodash'

import { Request } from '../../utils'
import './index.less'

class TagsEditor extends Component {
  static propTypes = {
    accountInfo: PropTypes.object.isRequired,
  }

  state = {
    showTagInput: false,
    tagList: this.props.accountInfo.tags,
  }

  inputTagElem = ''

  handleCLickAddInputTag = () => {
    if (this.state.tagList.length > 4) {
      message.warning('最多允许五个标签')
      return
    }
    const newTag = _.trim(this.inputTagElem.value)
    if (newTag !== '') {
      this.handleClickAddTag(newTag)
      this.inputTagElem.value = ''
    }
  }

  handleClickAddTag = (tagContent) => {
    Request.createTag(tagContent).then((res) => {
      const tagInfo = res.body
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
    return (
      <div className="TagsEditor">
        <p className="xfolio-text-title-s">标签</p>

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
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accountInfo: state.AccountInfo,
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TagsEditor)
