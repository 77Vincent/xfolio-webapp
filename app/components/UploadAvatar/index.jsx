import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import UploadAvatarBase from '../UploadAvatarBase'
import './index.less'

export default class UploadAvatar extends Component {
  static propTypes = {
    style: PropTypes.object,
    avatar_id: PropTypes.number,
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
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="upload-avatar-wrap" style={wrapStyle}>
        <h5 className="title">上传头像</h5>
        <UploadAvatarBase
          avatar_id={this.props.avatar_id}
        />
      </div>
    )
  }
}
