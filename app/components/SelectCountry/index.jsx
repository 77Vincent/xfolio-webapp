import React, { Component } from 'react'
import _ from 'lodash'
import { Select, Spin, message } from 'antd'
import PropTypes from 'prop-types'

import { Request } from '../../utils'
import constDataHolder from '../../store/constDataHolder'

class SelectCountry extends Component {
  static propTypes = {
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.array,
  }

  static defaultProps = {
    multiple: true,
    onChange: _.noop,
    value: [],
  }

  constructor(props) {
    super(props)
    this.entireOptions = _.map(constDataHolder.countries, each => ({
      value: String(each.id), // 数字转成字符
      name: each.cn,
    }))
  }

  state = {
    options: [],
    value: this.props.value,
    fetching: false,
  }

  entireOptions = []

  limitedRequest = _.throttle(_.debounce(async (search) => {
    let options = []
    const res = await Request.getCountries({ search })
    options = _.map(res.body, each => ({
      value: `${each.id}`,
      name: each.cn,
    }))
    this.setState({
      options,
      fetching: false,
    })
  }, 100), 100)

  handleInputChange = (input) => {
    this.setState({ fetching: true })
    this.limitedRequest(_.trim(input))
  }

  handleOptionChange = (value) => {
    if (!this.props.multiple && value.length > 1) {
      message.warning('只允许添加一个国家')
      return
    }
    this.setState({
      value: _.uniqWith(value, (a, b) => `${a.key}` === `${b.key}`),
      options: [],
    })
    this.props.onChange(_.map(value, each => Number(each.key))) // 字符转回数字
  }

  render() {
    const optionsData = _.isEmpty(this.state.options) ? this.entireOptions : this.state.options

    return (
      <Select
        mode="multiple"
        placeholder="搜索国家"
        notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
        labelInValue
        filterOption={false}
        value={this.state.value}
        onSearch={this.handleInputChange}
        onChange={this.handleOptionChange}
      >
        {
          _.map(optionsData, (each, index) => (
            <Select.Option value={each.value} key={index}>{each.name}</Select.Option>
          ))
        }
      </Select>
    )
  }
}

export default SelectCountry
