import React, { Component } from 'react'
import _ from 'lodash'
import { Select, Spin } from 'antd'
import PropTypes from 'prop-types'

import { Request } from '../../utils'
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

  constructor(props) {
    super(props)
    this.majorsInfo = _.map(constDataHolder.majors, major => ({
      value: String(major.id), // 数字转成字符
      name: major.cn,
    }))
  }

  state = {
    majorOptions: [],
    value: this.props.value,
    fetching: false,
  }

  majorsInfo = []

  limitedRequest = _.throttle(_.debounce(async (search) => {
    let majorOptions = []
    const res = await Request.getMajors({ search })
    majorOptions = _.map(res.body, each => ({
      value: `${each.id}`,
      name: each.cn,
    }))
    this.setState({
      majorOptions,
      fetching: false,
    })
  }, 100), 100)

  handleInputChange = (input) => {
    this.setState({ fetching: true })
    this.limitedRequest(_.trim(input))
  }

  handleOptionChange = (value) => {
    this.setState({
      value: _.uniqWith(value, (a, b) => `${a.key}` === `${b.key}`),
      majorOptions: [],
    })
    this.props.onChange(_.map(value, major => Number(major.key))) // 字符转回数字
  }

  render() {
    const majorOptionsData = _.isEmpty(this.state.majorOptions) ? this.majorsInfo : this.state.majorOptions

    return (
      <Select
        mode="multiple"
        placeholder="请输入专业名称"
        notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
        labelInValue
        value={this.state.value}
        filterOption={false}
        onSearch={this.handleInputChange}
        onChange={this.handleOptionChange}
      >
        {
          _.map(majorOptionsData, (major, index) => (
            <Select.Option value={major.value} key={index}>{major.name}</Select.Option>
          ))
        }
      </Select>
    )
  }
}

export default SelectMajors
