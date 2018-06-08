import React, { Component } from 'react'
import _ from 'lodash'
import { Select } from 'antd'
import uuidv1 from 'uuid/v1'
import PropTypes from 'prop-types'

import constDataHolder from '../../store/constDataHolder'

class SelectMajorsWrapped extends Component {
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
      value: `${major.id}`, // 数字转成字符
      name: major.label,
    }))
  }

  componentDidCatch(err, info) {
    Log.info('err ', err, info)
  }

  majorsInfo = []

  handleSelectOption = (value) => {
    Log.info('handleSelectOption ', value)
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
    Log.info('handleOptionChange ', value, options)
    this.setState({
      value,
      majorOptions: [],
    })
    this.props.onChange(_.map(value, major => major.key)) // 字符转回数字
  }

  render() {
    Log.log('this state majorOptions ', this.state.majorOptions)

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

export default SelectMajorsWrapped
