import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Icon, Upload, message } from 'antd'
import { Cropper } from 'react-image-cropper'

import { Request } from '../../utils'
import './index.less'

export default class UploadAvatarBase extends Component {
  static propTypes = {
    style: PropTypes.object,
    avatar_id: PropTypes.number,
    tipContent: PropTypes.string,
    cropRatio: PropTypes.number,
  };

  static defaultProps = {
    style: {},
    avatar_id: null,
    tipContent: null,
    cropRatio: 1,
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
    log('call uploadImage ', this.props.avatar_id)
    this.setState({
      uploading: true,
    })
    const avatarData = {
      content: this.uploadImageBase64.split(',')[1],
      mime: this.uploadImageInfo.type,
    }
    try {
      if (this.props.avatar_id === null) {
        await Request
          .uploadAvatar(avatarData)
          .then(() => message.success('修改成功！'))
      } else {
        await Request
          .updateAvatar(this.props.avatar_id, avatarData)
          .then(() => message.success('修改成功！'))
      }
    } catch (e) {
      log('upload image filed ', e)
      message.error('修改失败！')
    }
    this.setState({
      uploading: false,
    })
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
      <div className="upload-avatar-base" style={wrapStyle}>
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
              <img src={`/api/avatars/${this.props.avatar_id}`} alt="avatar" className="avatar" />
            )
          }
          <div className="tip-wrap">
            <Icon type={this.state.uploading === true ? 'loading' : 'plus'} />
            {
              typeof this.props.tipContent === 'string' && this.props.tipContent.length > 0 && (
                <p className="tip">{ this.props.tipContent }</p>
              )
            }
          </div>
        </Upload>
        <Modal
          title="编辑头像"
          visible={this.state.showModal}
          onOk={this.handleModalClickOk}
          onCancel={this.handleModalClickCancel}
        >
          <Cropper
            ratio={this.props.cropRatio}
            src={this.uploadImageBase64}
            ref={(ref) => { this.imageCropper = ref }}
          />
        </Modal>
      </div>
    )
  }
}
