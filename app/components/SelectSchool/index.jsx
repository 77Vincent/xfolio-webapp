import React, { Component } from 'react'
import _ from 'lodash'
import { Select } from 'antd'
import uuidv1 from 'uuid/v1'
import PropTypes from 'prop-types'

import constDataHolder from '../../store/constDataHolder'

class SelectSchool extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: _.noop,
  };

  state = {
    schoolOptions: [],
    value: '',
  }

  componentDidMount() {
    this.schoolsInfo = (
      _.map(constDataHolder.schools, schoolInfo => ({
        value: `${schoolInfo.id}`,
        name: schoolInfo.cn,
      }))
    )
  }

  schoolsInfo = []

  handleSelectOption = (value) => {
    const schoolName = constDataHolder.schoolsNormalized[value].cn
    this.setState({
      value: schoolName,
    })
    // 上报修改
    this.props.onChange(Number(value))
  }

  handleInputChange = (input) => {
    const inputValue = _.trim(input)
    let schoolOptions = []
    if (inputValue !== '') {
      schoolOptions = _.filter(this.schoolsInfo, info => info.name.indexOf(input) !== -1)
    }
    this.setState({
      value: input,
      schoolOptions,
    })
  }

  render() {
    return (
      <Select
        mode="combobox"
        placeholder="请输入国家名称"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        value={this.state.value}
        onSearch={this.handleInputChange}
        onSelect={this.handleSelectOption}
      >
        {
          _.map(this.state.schoolOptions, optionInfo => (
            <Select.Option value={optionInfo.value} key={uuidv1()}>{optionInfo.name}</Select.Option>
          ))
        }
      </Select>
    )
  }
}

export default SelectSchool
