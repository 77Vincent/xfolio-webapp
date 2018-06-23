import React, { Component } from 'react'
import _ from 'lodash'
import { Select } from 'antd'
import PropTypes from 'prop-types'

class SelectSingle extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
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
          {this.props.value.name}
        </p>
        <Select
          style={{
            height: '32px',
            width: '200px',
            display: this.props.isEdit ? 'block' : 'none',
          }}
          name={this.props.id}
          disabled={!this.props.isEdit}
          placeholder={`请选择${this.props.label}`}
          defaultValue={this.props.value.value}
          onSelect={this.props.onChange}
        >
          {
            _.map(this.props.options, ({ value, name }, index) => (
              <Select.Option value={value} key={index}>{name}</Select.Option>
            ))
          }
        </Select>
      </div>
    )
  }
}

export default SelectSingle
