import React, { Component } from 'react'
import _ from 'lodash'
import { Select, Spin } from 'antd'
import uuidv1 from 'uuid/v1'
import PropTypes from 'prop-types'

import { Request } from '../../utils'
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
    fetching: false,
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

  limitedRequest = _.throttle(_.debounce(async (input) => {
    let schoolOptions = []
    const schoolsResponse = await Request.getSchools('', input)
    schoolOptions = _.map(JSON.parse(schoolsResponse.text), schoolInfo => ({
      value: `${schoolInfo.id}`,
      name: schoolInfo.cn,
    }))
    this.setState({
      schoolOptions,
      fetching: false,
    })
  }, 100), 100)

  handleInputChange = async (input) => {
    this.setState({ fetching: true })
    this.limitedRequest(_.trim(input))
    this.setState({ value: input })
  }

  render() {
    return (
      <Select
        mode="combobox"
        placeholder="请输入学校名称"
        defaultActiveFirstOption={false}
        notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
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
