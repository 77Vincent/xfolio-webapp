import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Tag, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cx from 'classnames'

import constDataHolder from '../../store/constDataHolder'
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
        <div
          className={cx({
            'avatar-wrap': true,
            'edit-mode': editMode === true,
            'has-avatar': teacherInfo.avatar_id !== null,
          })}
        >
          {
            editMode === false && teacherInfo.avatar_id !== null && (
              <img src={`/api/avatars/${teacherInfo.avatar_id}`} alt="导师头像" className="teacher-avatar" />
            )
          }
          {
            editMode === true && (
              <div className="edit-avatar-wrap">
                <UploadAvatarBase
                  avatar_id={teacherInfo.avatar_id}
                  userId={teacherInfo.id}
                  tipContent="修改头像"
                  cropRatio={47 / 21}
                />
              </div>
            )
          }
        </div>
        <div className="teacher-info-detail">
          <p className="teacher-name">{teacherInfo.name}</p>
          <div className="module-wrap">
            {
              teacherInfo.tags.length > 0 && (
                <div className="teacher-tags">
                  { _.map(teacherInfo.tags, tag => <Tag key={tag.id}>{tag.content}</Tag>) }
                </div>
              )
            }
            <div className="education-detail">
              <p className="item">毕业于：{constDataHolder.schoolsNormalized[teacherInfo.school_id].cn}</p>
              <p className="item">指导学生数：0</p>
              <p className="item">现有学生：0</p>
              <p className="item">学生录取院校：AA；UCL</p>
              <p className="item">本周可约课时：{available}</p>
            </div>
          </div>
          <div className="operas-wrap">
            {
              this.props.showFavBtn === true && (
                <a href="javascript:;" className="btn-favorite" onClick={this.handleUpdateFollowStatus}>
                  {
                    this.props.isFollowing ? (
                      <Icon type="star" />
                    ) : (
                      <Icon type="star-o" />
                    )
                  }
                </a>
              )
            }
            {
              this.props.showAppointBtn === true && (
                <Button
                  className={cx({
                    'btn-order': true,
                    disabled: available === 0,
                  })}
                  disabled={available === 0}
                >
                  {
                    available > 0 ? (
                      <Link to={`/submit-order?userId=${teacherInfo.id}`}>预约</Link>
                    ) : '已约满'
                  }
                </Button>
              )
            }
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
