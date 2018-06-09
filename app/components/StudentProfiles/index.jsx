import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'

import { StudentBasicAccountInfo, UploadAvatar } from '../index'
import './index.less'

class StudentProfiles extends Component {
  static propTypes = {
    style: PropTypes.object,
    avatar_url: PropTypes.string.isRequired,
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
          originImageUrl={this.props.avatar_url}
        />
        <StudentBasicAccountInfo />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  avatar_url: state.AccountInfo.avatar_url,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfiles)
