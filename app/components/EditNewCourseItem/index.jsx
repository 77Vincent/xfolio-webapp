import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Tag, Icon } from 'antd'

import './index.less'

export default class EditNewCourseItem extends Component {
  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  state = {
    showEditContentPopUp: false,
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  toggleShowContentPopup = () => {
    this.setState({
      showEditContentPopUp: !this.state.showEditContentPopUp,
    })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="edit-new-course-item" style={wrapStyle}>
        <div className="new-course-content-wrap">
          <div className="button-wrap">
            <a className="add-course-content" onClick={this.toggleShowContentPopup} role="button" tabIndex={0}>
              <Icon type="plus" />
            </a>
          </div>
          <div className="content-wrap">
            <span className="course-content">概念生成；一手调研；调研报告制作方法；拼贴；手绘效果图；排版；ps画效果图；AI画款式图；</span>
            <a
              href="javascript:;"
              className="btn-submit"
            >
              确定
            </a>
          </div>
        </div>
        {
          this.state.showEditContentPopUp && (
            <div className="add-course-content-popup">
              <div className="input-wrap">
                <input type="text" className="input-content" placeholder="请输入内容" />
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
                <span className="content-tem"><span className="high-light">调研</span>方法</span>
                <span className="content-tem">调研案例</span>
                <span className="content-tem">材料调研</span>
                <span className="content-tem">一手调研方法</span>
                <span className="content-tem">二手调研</span>
                <span className="content-tem">二手调研</span>
                <span className="content-tem">二手调研</span>
                <span className="content-tem">二手调研</span>
                <span className="content-tem">二手调研</span>
                <span className="content-tem">二手调研</span>
                <span className="content-tem">二手调研</span>
                <span className="content-tem">二手调研</span>
                <span className="content-tem">二手调研</span>
                <span className="content-tem">二手调研</span>
                <span className="content-tem">二手调研</span>
                <span className="content-tem">二手调研</span>
                <span className="content-tem">二手调研</span>
              </div>
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
            </div>
          )
        }
      </div>
    )
  }
}
