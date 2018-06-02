import cx from 'classnames'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Tag, Icon, Button } from 'antd'

import './index.less'
import { getImage } from '../../utils'

export default class TeacherInfoSnapshot extends Component {
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
      <div className="teacher-info-snapshot-wrap" style={wrapStyle}>
        <img src={getImage('default-teacher-avatar-470-21-.png')} alt="" className="teacher-avatar" />
        <div className="teacher-info-detail">
          <p className="teacher-name">马天驰</p>
          <div className="teacher-tags">
            <Tag>名校毕业</Tag>
            <Tag>风趣</Tag>
            <Tag>教学经验</Tag>
            <Tag>工作经验</Tag>
          </div>
          <div className="education-detail">
            <p className="item">毕业于：Architectual AssociationAssociationAssociationAssociation</p>
            <p className="item">指导学生数：100</p>
            <p className="item">现有学生：10</p>
            <p className="item">学生录取院校：AA；UCL</p>
            <p className="item">本周可约课时：0</p>
          </div>
          <div className="operas-wrap">
            <a href="javascript:;" className="btn-favorite">
              {
                true ? (
                  <Icon type="star-o" />
                ) : (
                  <Icon type="star" />
                )
              }
            </a>
            <Button
              className={cx({
                'btn-order': true,
                disabled: false,
              })}
            >
              预约
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
