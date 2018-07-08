import React, { Component } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

class InfoInput extends Component {
  static propTypes = {
    default: PropTypes.string,
    customClass: PropTypes.array,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    isEdit: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string,
  }

  static defaultProps = {
    default: '',
    className: '',
    customClass: [],
    isEdit: false,
    type: 'input',
    onChange: null,
  }

  render() {
    return (
      <div className={this.props.className}>
        <p className="xfolio-text-info-title">{this.props.label}</p>
        <p
          style={{
            height: '32px',
            display: !this.props.isEdit ? 'block' : 'none',
          }}
          className={this.props.customClass.length ? this.props.customClass.join(' ') : 'xfolio-text-info-value'}
        >
          {this.props.default || '未填写'}
        </p>
        {
          this.props.type === 'textarea' ?
            <Input.TextArea
              style={{
                width: '200px',
                display: this.props.isEdit ? 'block' : 'none',
              }}
              className="xfolio-text-edit"
              onChange={this.props.onChange}
              defaultValue={this.props.default}
            /> :
            <Input
              style={{
                height: '32px',
                width: '200px',
                display: this.props.isEdit ? 'block' : 'none',
              }}
              className="xfolio-text-edit"
              onChange={this.props.onChange}
              type={this.props.type}
              defaultValue={this.props.default}
            />
        }
      </div>
    )
  }
}

export default InfoInput
