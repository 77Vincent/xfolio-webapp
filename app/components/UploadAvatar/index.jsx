import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Icon, Upload } from 'antd'

import './index.less'

export default class UploadAvatar extends Component {
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
      <div className="upload-avatar-wrap" style={wrapStyle}>
        <h5 className="title">上传头像</h5>
        <Upload name="" listType="picture">
          <Button type="dashed" className="btn-choose-file">
            <Icon type="plus" />
          </Button>
        </Upload>
      </div>
    )
  }
}
