import React, { Component } from 'react'
import _ from 'lodash'
import { Select } from 'antd'
import uuidv1 from 'uuid/v1'
import PropTypes from 'prop-types'

import constDataHolder from '../../store/constDataHolder'

class SelectMajors extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.array,
  };

  static defaultProps = {
    onChange: _.noop,
    value: [],
  };

  state = {
    majorOptions: [],
    value: this.props.value,
  }

  componentDidMount() {
    this.majorsInfo = _.map(constDataHolder.majors, major => ({
      value: major.id, // 数字转成字符
      name: major.cn,
    }))
  }

  componentDidCatch(err, info) {
    log('err ', err, info)
  }

  majorsInfo = []

  handleSelectOption = (value) => {
    log('handleSelectOption ', value)
    this.state.value.push(value)
    this.setState({
      value: this.state.value,
      majorOptions: [],
    })
    // 上报修改
    this.props.onChange(_.map(this.state.value, major => major.key)) // 字符转回数字
  }

  handleInputChange = (input) => {
    const inputValue = _.trim(input)
    let majorOptions = []
    if (inputValue !== '') {
      majorOptions = _.filter(this.majorsInfo, info => info.name.indexOf(input) !== -1)
    }
    this.setState({
      majorOptions,
    })
  }

  handleOptionChange = (value, options) => {
    log('handleOptionChange ', value, options)
    this.setState({
      value,
      majorOptions: [],
    })
    this.props.onChange(_.map(value, major => major.key)) // 字符转回数字
  }

  render() {
    return (
      <Select
        mode="multiple"
        placeholder="请输入专业名称"
        labelInValue
        value={this.state.value}
        filterOption={false}
        onSearch={this.handleInputChange}
        onSelect={this.handleSelectOption}
        onChange={this.handleOptionChange}
      >
        {
          _.map(this.state.majorOptions, major => (
            <Select.Option value={major.value} key={uuidv1()}>{major.name}</Select.Option>
          ))
        }
      </Select>
    )
  }
}

export default SelectMajors
