import React, { Component } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

class InfoInput extends Component {
  static propTypes = {
    default: PropTypes.string,
    label: PropTypes.string.isRequired,
    isEdit: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
  }

  static defaultProps = {
    default: '',
    isEdit: false,
    type: 'input',
  }

  render() {
    return (
      <div>
        <p className="xfolio-text-info-title">{this.props.label}</p>
        <p
          style={{
            height: '32px',
            display: !this.props.isEdit ? 'block' : 'none',
          }}
          className="xfolio-text-info-value"
        >
          {this.props.default || '未填写'}
        </p>
        {
          this.props.type === 'input' ?
            <Input
              style={{
                height: '32px',
                width: '200px',
                display: this.props.isEdit ? 'block' : 'none',
              }}
              className="xfolio-text-edit"
              onChange={this.props.onChange}
              defaultValue={this.props.default}
            /> :
            <Input.TextArea
              style={{
                width: '200px',
                display: this.props.isEdit ? 'block' : 'none',
              }}
              className="xfolio-text-edit"
              onChange={this.props.onChange}
              defaultValue={this.props.default}
            />
        }
      </div>
    )
  }
}

export default InfoInput
