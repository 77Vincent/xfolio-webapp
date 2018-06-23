import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Tag, Icon, Row, Col } from 'antd'
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
  }

  static defaultProps = {
    style: {},
    isFollowing: false,
    showAppointBtn: true,
    showFavBtn: true,
    editMode: false,
  }

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

    return (
      <div
        className={cx({
          'teacher-info-snapshot-wrap': true,
          'edit-mode': editMode === true,
        })}
        style={wrapStyle}
      >
        <h1 className="teacher-name">{teacherInfo.name}</h1>
        <p className="teacher-bio">{teacherInfo.bio}</p>
        <div
          className={cx({
            'avatar-wrap': true,
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
          <Row className="block-top">
            <Col span={12}>
              <section>
                <span>已教授学生</span>
                <span>{ teacherInfo.students - teacherInfo.students_onboard }</span>
              </section>
              <section>
                <span>在授学生</span>
                <span>{ teacherInfo.students_onboard }</span>
              </section>
              <section>
                <span>可预约时间</span>
                <span>{ teacherInfo.available }</span>
              </section>
            </Col>
            <Col span={12}>
              <section>
                <span>最高学历</span>
                <span>
                  {
                    teacherInfo.degree_id !== null ? constDataHolder.degrees[teacherInfo.degree_id].cn : '未设置'
                  }
                </span>
              </section>
              <section>
                <span>现居地</span>
                <span>
                  {
                    teacherInfo.city ?
                    constDataHolder.cities.filter(each => each.id === teacherInfo.city)[0].fullname :
                    '未设置'
                  }
                </span>
              </section>
              <section>
                <span>授课地点</span>
                {
                  teacherInfo.places.length ?
                    _.map(teacherInfo.places, (each, index) => { return <span key={index}>{each.cn}</span> }) :
                    '未设置'
                }
              </section>
              <section>
                <span>收费</span>
                <span>{ teacherInfo.cost !== null ? `${teacherInfo.cost} ¥/小时` : '未设置' }</span>
              </section>
            </Col>
          </Row>

          <div className="block-edu">
            <span>{ teacherInfo.countries.length ? teacherInfo.countries[0].cn : '未设置' }</span>
            <span>{ teacherInfo.schools.length ? teacherInfo.schools[0].cn : '未设置' }</span>
            <span>
              {
                teacherInfo.majors.length ?
                  _.map(teacherInfo.majors, (each, index) => { return <span key={index}>{each.cn}</span> }) :
                  '未设置'
              }
            </span>
          </div>
          <div className="block-bottom" style={{ textAlign: 'right' }}>
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
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = dispatch => ({
  removeFollowingId: dispatch.AccountInfo.removeFollowingId,
  addFollowingId: dispatch.AccountInfo.addFollowingId,
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherInfoSnapshot)
