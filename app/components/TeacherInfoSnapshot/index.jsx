import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Tag, Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cx from 'classnames'

import { Request } from '../../utils'
import UploadAvatarBase from '../UploadAvatarBase'
import './index.less'

class TeacherInfoSnapshot extends Component {
  static propTypes = {
    style: PropTypes.object,
    teacherInfo: PropTypes.object.isRequired,
    isFollowing: PropTypes.bool,
    showAppointBtn: PropTypes.bool,
    showFavBtn: PropTypes.bool,
    editMode: PropTypes.bool,
    removeFollowingId: PropTypes.func.isRequired,
    addFollowingId: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
    isFollowing: false,
    showAppointBtn: true,
    showFavBtn: true,
    editMode: false,
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleUpdateFollowStatus = () => {
    const userId = this.props.teacherInfo.id
    if (this.props.isFollowing) {
      Request.removeFollowing(userId).then(() => {
        this.props.removeFollowingId(userId)
      })
    } else {
      Request.addFollowing(userId).then(() => {
        this.props.addFollowingId(userId)
      })
    }
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const { teacherInfo, editMode } = this.props
    const { available } = teacherInfo
    log('editMode ', editMode)

    return (
      <div className="teacher-info-snapshot-wrap" style={wrapStyle}>
        <h1 className="teacher-name">{teacherInfo.name}</h1>
        <div
          className={cx({
            'avatar-wrap': true,
            'edit-mode': editMode === true,
            'has-avatar': teacherInfo.avatar_id !== null,
          })}
        >
          {
            editMode === false && teacherInfo.avatar_id !== null &&
            <img src={`/api/avatars/${teacherInfo.avatar_id}`} alt="导师头像" className="teacher-avatar" />
          }
          {
            editMode === true &&
            <div className="edit-avatar-wrap">
              <UploadAvatarBase
                avatar_id={teacherInfo.avatar_id}
                userId={teacherInfo.id}
                tipContent="修改头像"
                cropRatio={700 / 275}
              />
            </div>
          }
        </div>
        <div className="teacher-details">
          {
            <div className="teacher-tags">
              { _.map(teacherInfo.tags, tag => <Tag key={tag.id}>{tag.content}</Tag>) }
            </div>
          }
          <Row>
            <h2 className="teacher-major">{teacherInfo.students_onboard_url}</h2>
          </Row>
          <div className="block-bottom">
            <Row type="flex" justify="space-between" align="bottom" style={{ width: '100%' }}>
              <Col>
                <span>{teacherInfo.school.cn}</span>
                <span>{teacherInfo.majors[0].cn}</span>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                {
                  this.props.showFavBtn === true &&
                  <a href="javascript:;" className="btn-follow" onClick={this.handleUpdateFollowStatus}>
                    {
                      this.props.isFollowing ? <Icon type="heart" /> : <Icon type="heart-o" />
                    }
                  </a>
                }
                {
                  this.props.showAppointBtn === true &&
                  <span className="btn-order">
                    {
                      available > 0 ?
                        <Link to={`/submit-order?userId=${teacherInfo.id}`}>预约</Link> :
                        '已约满'
                    }
                  </span>
                }
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  removeFollowingId: dispatch.AccountInfo.removeFollowingId,
  addFollowingId: dispatch.AccountInfo.addFollowingId,
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherInfoSnapshot)
