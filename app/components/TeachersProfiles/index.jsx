import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { TeacherBasicAccountInfo, TeacherInfoSnapshot, TagsEditor } from '../index'
import './index.less'

class TeachersProfiles extends Component {
  static propTypes = {
    accountInfo: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="teacher-profiles-wrap">
        <div className="teacher-profile-detail">
          <TeacherInfoSnapshot
            teacherInfo={this.props.accountInfo}
            showAppointBtn={false}
            showFavBtn={false}
            editMode
          />

          <TagsEditor />

          <TeacherBasicAccountInfo />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accountInfo: state.AccountInfo,
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TeachersProfiles)
