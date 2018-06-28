import React, { Component } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

class InfoInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isEdit: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isEdit: false,
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
          {this.props.default}
        </p>
        <Input
          name={this.props.id}
          style={{
            height: '32px',
            width: '200px',
            display: this.props.isEdit ? 'block' : 'none',
          }}
          className="xfolio-text-edit"
          onChange={this.props.onChange}
          defaultValue={this.props.default}
        />
      </div>
    )
  }
}

export default InfoInput
