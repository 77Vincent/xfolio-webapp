import React, { Component } from 'react'
import _ from 'lodash'
import { Select } from 'antd'
import uuidv1 from 'uuid/v1'
import PropTypes from 'prop-types'

import constDataHolder from '../../store/constDataHolder'

class SelectCountryWrapped extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: _.noop,
  };

  state = {
    countryOptions: [],
    value: '',
  }

  componentDidMount() {
    this.countryInfoCN = (
      _.map(constDataHolder.countries, countryInfo => ({
        value: countryInfo.code,
        name: countryInfo.cn,
      }))
    )
  }

  countryInfoCN = []

  handleSelectOption = (value) => {
    const countryName = constDataHolder.countriesNormalized[value].cn
    this.setState({
      value: countryName,
    })
    // 上报修改
    this.props.onChange(value)
  }

  handleInputChange = (input) => {
    const inputValue = _.trim(input)
    let countryOptions = []
    if (inputValue !== '') {
      countryOptions = _.filter(this.countryInfoCN, info => info.name.indexOf(input) !== -1)
    }
    this.setState({
      value: input,
      countryOptions,
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
          _.map(this.state.countryOptions, optionInfo => (
            <Select.Option value={optionInfo.value} key={uuidv1()}>{optionInfo.name}</Select.Option>
          ))
        }
      </Select>
    )
  }
}

export default SelectCountryWrapped
