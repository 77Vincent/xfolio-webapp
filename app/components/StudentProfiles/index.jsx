import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { StudentBasicAccountInfo, UploadAvatar } from '../index'
import './index.less'

class StudentProfiles extends Component {
  static propTypes = {
    style: PropTypes.object,
    avatar_id: PropTypes.number,
    userId: PropTypes.number.isRequired,
  };

  static defaultProps = {
    style: {},
    avatar_id: null,
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="student-profiles-wrap" style={this.props.style}>
        <UploadAvatar
          avatar_id={this.props.avatar_id}
          userId={this.props.userId}
        />
        <StudentBasicAccountInfo />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  avatar_id: state.AccountInfo.avatar_id,
  userId: state.AccountInfo.id,
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfiles)
