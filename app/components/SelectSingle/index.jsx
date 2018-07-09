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
    className: PropTypes.string,
  }

  static defaultProps = {
    label: '',
    default: {},
    isEdit: false,
    className: '',
  }

  render() {
    const { name } = this.props.default

    return (
      <div className={this.props.className}>
        <p className="xfolio-text-title-s">{this.props.label}</p>
        <p
          style={{
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
