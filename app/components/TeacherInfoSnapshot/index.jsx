import cx from 'classnames'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Tag, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Request } from '../../utils'
import './index.less'

class TeacherInfoSnapshot extends Component {
  static propTypes = {
    style: PropTypes.object,
    teacherInfo: PropTypes.object.isRequired,
    isFollowing: PropTypes.bool,
    showAppointBtn: PropTypes.bool,
    showFavBtn: PropTypes.bool,
    removeFollowingId: PropTypes.func.isRequired,
    addFollowingId: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
    isFollowing: false,
    showAppointBtn: true,
    showFavBtn: true,
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
    const { teacherInfo } = this.props

    return (
      <div className="teacher-info-snapshot-wrap" style={wrapStyle}>
        <img src={teacherInfo.avatar_url} alt="" className="teacher-avatar" />
        <div className="teacher-info-detail">
          <p className="teacher-name">{teacherInfo.name}</p>
          <div className="module-wrap">
            {
              teacherInfo.tags.length > 0 && (
                <div className="teacher-tags">
                  { _.map(teacherInfo.tags, (tag, i) => <Tag key={i}>{tag}</Tag>) }
                </div>
              )
            }
            <div className="education-detail">
              <p className="item">毕业于：{teacherInfo.school}</p>
              <p className="item">指导学生数：0</p>
              <p className="item">现有学生：0</p>
              <p className="item">学生录取院校：AA；UCL</p>
              <p className="item">本周可约课时：{teacherInfo.available}</p>
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
                    disabled: false,
                  })}
                >
                  <Link to={`/submit-order?userId=${teacherInfo.id}`}>预约</Link>
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
