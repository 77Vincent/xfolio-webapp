import React, { Component } from 'react'
import _ from 'lodash'
import { Select, Spin, message } from 'antd'
import PropTypes from 'prop-types'

import { Request } from '../../utils'
import constDataHolder from '../../store/constDataHolder'

class SelectMultiple extends Component {
  static propTypes = {
    resource: PropTypes.string.isRequired,
    maxSelection: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.array,
  }

  static defaultProps = {
    maxSelection: 1,
    onChange: _.noop,
    value: [],
  }

  constructor(props) {
    super(props)
    this.entireOptions = _.map(constDataHolder[this.props.resource], each => ({
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
    const res = await Request[`get${_.capitalize(this.props.resource)}`]({ search })
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
    if (value.length > this.props.maxSelection) {
      message.warning(`只允许添加${this.props.maxSelection}条`)
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
        placeholder="输入搜索"
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

export default SelectMultiple
