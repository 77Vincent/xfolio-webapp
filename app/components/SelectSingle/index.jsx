import React, { Component } from 'react'
import _ from 'lodash'
import { Select } from 'antd'
import PropTypes from 'prop-types'

class SelectSingle extends Component {
  static propTypes = {
    default: PropTypes.object,
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
    isEdit: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    label: '',
    default: {},
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
          {this.props.default.name || this.props.default.cn}
        </p>
        <Select
          style={{
            height: '32px',
            width: '200px',
            display: this.props.isEdit ? 'block' : 'none',
          }}
          disabled={!this.props.isEdit}
          placeholder={`请选择${this.props.label}`}
          defaultValue={this.props.default.cn || this.props.default.value}
          onSelect={this.props.onChange}
        >
          {
            _.map(this.props.options, ({ value, name }, index) => (
              <Select.Option value={String(value)} key={index}>{name}</Select.Option>
            ))
          }
        </Select>
      </div>
    )
  }
}

export default SelectSingle
