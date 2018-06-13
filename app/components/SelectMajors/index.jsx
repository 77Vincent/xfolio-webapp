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

  constructor(props) {
    super(props)
    this.majorsInfo = _.map(constDataHolder.majors, major => ({
      value: `${major.id}`, // 数字转成字符
      name: major.cn,
    }))
  }

  state = {
    majorOptions: [],
    value: this.props.value,
  }

  majorsInfo = []

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
        labelInValue
        value={this.state.value}
        filterOption={false}
        onSearch={this.handleInputChange}
        onChange={this.handleOptionChange}
      >
        {
          _.map(majorOptionsData, major => (
            <Select.Option value={major.value} key={uuidv1()}>{major.name}</Select.Option>
          ))
        }
      </Select>
    )
  }
}

export default SelectMajors
