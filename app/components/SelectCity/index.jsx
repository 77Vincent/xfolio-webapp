import React, { Component } from 'react'
import _ from 'lodash'
import { Select } from 'antd'
import uuidv1 from 'uuid/v1'
import PropTypes from 'prop-types'

import constDataHolder from '../../store/constDataHolder'

class SelectCity extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: _.noop,
  };

  state = {
    cityOptions: [],
    value: '',
  }

  componentDidMount() {
    this.citiesInfo = (
      _.map(constDataHolder.cities, cityInfo => ({
        value: cityInfo.code,
        name: cityInfo.name,
      }))
    )
  }

  citiesInfo = []

  handleSelectOption = (value) => {
    log('handleSelectOption ', value)
    const cityName = constDataHolder.citiesNormalized[value].name
    this.setState({
      value: cityName,
    })
    // 上报修改
    this.props.onChange(value)
  }

  handleInputChange = (input) => {
    const inputValue = _.trim(input)
    let cityOptions = []
    if (inputValue !== '') {
      cityOptions = _.filter(this.citiesInfo, info => info.name.indexOf(input) !== -1)
    }
    this.setState({
      value: input,
      cityOptions,
    })
  }

  render() {
    return (
      <Select
        mode="combobox"
        placeholder="请输入城市名称"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        value={this.state.value}
        onSearch={this.handleInputChange}
        onSelect={this.handleSelectOption}
      >
        {
          _.map(this.state.cityOptions, optionInfo => (
            <Select.Option value={optionInfo.value} key={uuidv1()}>{optionInfo.name}</Select.Option>
          ))
        }
      </Select>
    )
  }
}

export default SelectCity
