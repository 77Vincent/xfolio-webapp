import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'

import { StudentBasicAccountInfo, UploadAvatar } from '../index'
import './index.less'

class StudentProfiles extends Component {
  static propTypes = {
    style: PropTypes.object,
    avatar_id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
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
      <div className="student-profiles-wrap" style={wrapStyle}>
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

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfiles)
