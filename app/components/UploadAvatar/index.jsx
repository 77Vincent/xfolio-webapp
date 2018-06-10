import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Icon, Upload } from 'antd'
import { Cropper } from 'react-image-cropper'

import { Request } from '../../utils'
import './index.less'

export default class UploadAvatar extends Component {
  static propTypes = {
    style: PropTypes.object,
    avatar_id: PropTypes.number,
    userId: PropTypes.number.isRequired,
  };

  static defaultProps = {
    style: {},
    avatar_id: null,
  };

  state = {
    cropped: false,
    uploading: false,
    showModal: false,
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  uploadImageInfo = {}
  uploadImageBase64 = ''
  uploadResult = {}

  imageCropper

  handleBeforeUpload = (e) => {
    this.uploadImageInfo = e
    const reader = new FileReader()
    reader.onload = () => {
      this.uploadImageBase64 = reader.result
      this.setState({
        showModal: true,
      })
    }
    reader.readAsDataURL(e)
  }

  uploadImage = async () => {
    log('call uploadImage')
    this.setState({
      uploading: true,
    })
    try {
      this.uploadResult = await Request.updateAvatar(this.props.avatar_id, {
        content: this.uploadImageBase64.split(',')[1],
        mime: this.uploadImageInfo.type,
      }).then(res => JSON.parse(res.text))
    } catch (e) {
      log('upload image filed ', e)
    }
    this.setState({
      uploading: false,
    })
    log('uploadResult ', this.uploadResult)
  }

  handleModalClickOk = () => {
    this.uploadImageBase64 = this.imageCropper.crop()
    this.setState({
      cropped: true,
      showModal: false,
      uploading: true,
    })
    this.uploadImage()
  }

  handleModalClickCancel = () => {
    this.setState({
      showModal: false,
    })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="upload-avatar-wrap" style={wrapStyle}>
        <h5 className="title">上传头像</h5>
        <Upload
          className="upload-avatar"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={this.handleBeforeUpload}
          customRequest={_.noop}
        >
          {
            this.state.cropped === true && (
              <img src={this.uploadImageBase64} alt="avatar" className="avatar" />
            )
          }
          {
            this.state.cropped === false && this.props.avatar_id !== null && (
              <img src={`/api/avatar/${this.props.avatar_id}`} alt="avatar" className="avatar" />
            )
          }
          <Icon type={this.state.uploading === true ? 'loading' : 'plus'} className="upload-icon" />
        </Upload>
        <Modal
          title="编辑头像"
          visible={this.state.showModal}
          onOk={this.handleModalClickOk}
          onCancel={this.handleModalClickCancel}
        >
          <Cropper
            ratio={1}
            src={this.uploadImageBase64}
            ref={(ref) => { this.imageCropper = ref }}
          />
        </Modal>
      </div>
    )
  }
}
