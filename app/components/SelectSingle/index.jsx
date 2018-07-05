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
    const { name } = this.props.default

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
          {name}
        </p>
        <Select
          style={{
            height: '32px',
            width: '200px',
            display: this.props.isEdit ? 'block' : 'none',
          }}
          disabled={!this.props.isEdit}
          placeholder={`请选择${this.props.label}`}
          defaultValue={name}
          onSelect={this.props.onChange}
        >
          {
            _.map(this.props.options, (v, i) => (
              <Select.Option value={String(v.value)} key={i}>{v.name}</Select.Option>
            ))
          }
        </Select>
      </div>
    )
  }
}

export default SelectSingle
