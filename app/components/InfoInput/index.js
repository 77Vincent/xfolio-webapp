import React from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

const InfoInput = props => (
  <div className={props.className}>
    <p
      className={props.labelClassName ? props.labelClassName : 'xfolio-text-title-s'}
    >
      {props.label}
    </p>
    <p
      style={{
        display: !props.isEdit ? 'block' : 'none',
      }}
      className={props.valueClassName ? props.valueClassName : 'xfolio-text-info-value'}
    >
      {props.default || '未填写'}
    </p>
    {
      props.type === 'textarea' ?
        <Input.TextArea
          style={{
            width: '200px',
            display: props.isEdit ? 'block' : 'none',
          }}
          className="xfolio-text-edit"
          onChange={props.onChange}
          defaultValue={props.default}
        /> :
        <Input
          style={{
            height: '32px',
            width: '200px',
            display: props.isEdit ? 'block' : 'none',
          }}
          className="xfolio-text-edit"
          onChange={props.onChange}
          type={props.type}
          defaultValue={props.default}
        />
    }
  </div>
)

InfoInput.propTypes = {
  default: PropTypes.string,
  labelClassName: PropTypes.string,
  valueClassName: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  isEdit: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.string,
}

InfoInput.defaultProps = {
  default: '',
  className: '',
  labelClassName: '',
  valueClassName: '',
  isEdit: false,
  type: 'input',
  onChange: null,
}

export default InfoInput
