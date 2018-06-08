import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input, Button, Select, Tooltip, Icon } from 'antd'

import './index.less'

/* eslint-disable react/forbid-prop-types */

export default class UpdateAccountInfoItem extends Component {
  static propTypes = {
    style: PropTypes.object,
    inputType: PropTypes.oneOf(['input', 'select', 'custom']).isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    options: PropTypes.array,
    tip: PropTypes.string,
    onSubmit: PropTypes.func,
    inputElem: PropTypes.object,
  };

  static defaultProps = {
    style: {},
    placeholder: '',
    options: [],
    tip: '',
    onSubmit: _.noop,
    inputElem: null,
    value: '',
  };

  state = {
    showInput: false,
    value: this.props.value,
    options: this.props.options,
  }

  toggleShowInput = () => {
    this.setState({
      showInput: !this.state.showInput,
    })
  }

  handleInputChange = (e) => {
    let newValue
    switch (this.props.inputType) {
    case 'input':
      newValue = e.target.value
      break
    case 'select':
    case 'custom':
      Log.info('select change ', e)
      newValue = e
      break
    }
    this.setState({
      value: newValue,
    })
  }

  handleSelectChange = (value) => {
    this.setState({
      value,
    })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    Log.info('this.props ', this.props, this.state)

    const extraProps = {}
    if (this.props.inputType === 'select') {
      if (this.state.value !== null) {
        extraProps.defaultValue = this.state.value
      }
    }

    return (
      <div className="update-account-info-item" style={wrapStyle}>
        {
          this.state.showInput === false ? (
            <div className="operas-wrap">
              <a href="javascript:;" className="btn-start-update" onClick={this.toggleShowInput}>修改</a>
              {
                this.props.tip !== '' && (
                  <Tooltip placement="rightBottom" title={this.props.tip}>
                    <span className="btn-show-tip">
                      <Icon type="exclamation" />
                    </span>
                  </Tooltip>
                )
              }
            </div>
          ) : (
            <div className="input-wrap">
              {
                this.props.inputType === 'input' && (
                  <Input
                    placeholder={this.props.placeholder}
                    onChange={this.handleInputChange}
                    {...extraProps}
                  />
                )
              }
              {
                this.props.inputType === 'select' && (
                  <Select
                    placeholder={this.props.placeholder}
                    onChange={this.handleSelectChange}
                    {...extraProps}
                  >
                    {
                      _.map(this.state.options, ({ value, name }, index) => (
                        <Select.Option value={value} key={index}>{name}</Select.Option>
                      ))
                    }
                  </Select>
                )
              }
              {
                this.props.inputType === 'custom' && (
                  React.cloneElement(this.props.inputElem, {
                    onChange: this.handleSelectChange,
                  })
                )
              }
              <Button
                className="btn-submit"
                onClick={() => {
                  if (this.state.value !== this.props.value) {
                    this.props.onSubmit(this.state.value)
                    if (this.props.inputType === 'input') {
                      this.setState({
                        value: '',
                      })
                    }
                  }
                  this.toggleShowInput()
                }}
              >
                提交
              </Button>
            </div>
          )
        }
      </div>
    )
  }
}
