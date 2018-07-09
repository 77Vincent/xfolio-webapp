import React, { Component } from 'react'
import _ from 'lodash'
import { Select, Spin, message } from 'antd'
import PropTypes from 'prop-types'

import { Request } from '../../utils'
import constDataHolder from '../../store/constDataHolder'

class SelectMultiple extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    isEdit: PropTypes.bool,
    maxSelection: PropTypes.number,
    onChange: PropTypes.func,
    default: PropTypes.array,
    className: PropTypes.string,
  }

  static defaultProps = {
    label: '',
    maxSelection: 1,
    isEdit: false,
    onChange: null,
    default: [],
    className: '',
  }

  constructor(props) {
    super(props)
    this.entireOptions = _.map(constDataHolder[this.props.id], each => ({
      value: String(each.id), // 数字转成字符
      name: each.cn || each.fullname,
    }))
  }

  state = {
    options: [],
    values: this.props.default,
    fetching: false,
  }

  entireOptions = []

  limitedRequest = _.throttle(_.debounce(async (search) => {
    let options = []
    const res = await Request[`get${_.capitalize(this.props.id)}`]({ search })
    options = _.map(res.body, each => ({
      value: `${each.id}`,
      name: each.cn || each.fullname,
    }))
    this.setState({
      options,
      fetching: false,
    })
  }, 200), 200)

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
      values: _.uniqWith(value, (a, b) => `${a.key}` === `${b.key}`),
      options: [],
    })
    this.props.onChange(_.map(value, each => Number(each.key))) // 字符转回数字
  }

  render() {
    const optionsData = _.isEmpty(this.state.options) ? this.entireOptions : this.state.options

    return (
      <div className={this.props.className}>
        {
          this.props.label &&
          <p className="xfolio-text-title-s">{this.props.label}</p>
        }
        <div
          style={{
            display: !this.props.isEdit ? 'block' : 'none',
          }}
        >
          {
            this.props.default.length ?
              _.map(this.props.default, (each, i) => {
                return <p className="xfolio-text-info-value" key={i}>{each.label}</p>
              }) :
              <p className="xfolio-text-info-value">未设置</p>
          }
        </div>

        <Select
          style={{
            width: '200px',
            display: this.props.isEdit ? 'block' : 'none',
          }}
          mode="multiple"
          placeholder="输入搜索"
          notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
          labelInValue
          filterOption={false}
          value={this.state.values}
          onSearch={this.handleInputChange}
          onChange={this.handleOptionChange}
        >
          {
            _.map(optionsData, (each, index) => (
              <Select.Option value={each.value} key={index}>{each.name}</Select.Option>
            ))
          }
        </Select>
      </div>
    )
  }
}

export default SelectMultiple
