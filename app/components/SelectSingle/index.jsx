import React from 'react'
import uuidv4 from 'uuid/v4'
import { Select } from 'antd'
import PropTypes from 'prop-types'

const SelectSingle = (props) => {
  const { name } = props.default

  return (
    <div className={props.className}>
      <p className="xfolio-text-title-s">{props.label}</p>
      <p
        style={{
          display: !props.isEdit ? 'block' : 'none',
        }}
        className="xfolio-text-info-value"
      >
        {name}
      </p>
      <Select
        style={{
          height: '32px',
          width: '200px',
          display: props.isEdit ? 'block' : 'none',
        }}
        disabled={!props.isEdit}
        placeholder={`请选择${props.label}`}
        defaultValue={name}
        onSelect={props.onChange}
      >
        {
          props.options.map(v => (
            <Select.Option value={String(v.value)} key={uuidv4()}>{v.name}</Select.Option>
          ))
        }
      </Select>
    </div>
  )
}

SelectSingle.propTypes = {
  default: PropTypes.object,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  isEdit: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}
SelectSingle.defaultProps = {
  label: '',
  default: {},
  isEdit: false,
  className: '',
}

export default SelectSingle
