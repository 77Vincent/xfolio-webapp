import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { StudentBasicAccountInfo, UploadAvatar } from '../index'
import './index.less'

export default class StudentProfiles extends Component {
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
      <div className="student-profiles-wrap" style={wrapStyle}>
        <UploadAvatar />
        <StudentBasicAccountInfo />
      </div>
    )
  }
}
