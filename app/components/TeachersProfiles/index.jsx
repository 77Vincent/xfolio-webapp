import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Icon, Tag } from 'antd'

import { TeacherBasicAccountInfo, TeacherInfoSnapshot } from '../index'
import './index.less'

export default class StudentProfiles extends Component {
  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  state = {
    showTagInput: false,
  }

  componentDidMount() {

  }

  componentWillUnmount() {

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
              <Tag closable>123</Tag>
              <Tag closable>123</Tag>
              <Tag closable>123</Tag>
              <Tag closable>123</Tag>
              <Tag closable>123</Tag>
              <Tag closable>123</Tag>
            </div>
            {
              this.state.showTagInput === true && (
                <div className="add-tag-input-wrap">
                  <div className="input-tag-wrap">
                    <input className="input-tag" />
                    <Button className="btn-add-tag">
                      <Icon type="plus" />
                    </Button>
                  </div>
                  <div className="common-tags-wrap">
                    <p className="title">常用标签</p>
                    <div className="tags-wrap">
                      <Tag>123</Tag>
                      <Tag>123</Tag>
                      <Tag>123</Tag>
                      <Tag>123</Tag>
                      <Tag>123</Tag>
                      <Tag>123</Tag>
                      <Tag>123</Tag>
                      <Tag>123</Tag>
                      <Tag>123</Tag>
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
