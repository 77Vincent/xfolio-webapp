import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input, Button, Select } from 'antd'

import './index.less'

export default class UpdateAccountInfoItem extends Component {
  static propTypes = {
    style: PropTypes.object,
    inputType: PropTypes.oneOf('input', 'select'),
    placeholder: PropTypes.string,
    options: PropTypes.array,
  };

  static defaultProps = {
    style: {},
    inputType: 'input', // input select
    placeholder: '',
    options: [],
  };

  state = {
    showInput: false,
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  toggleShowInput = () => {
    this.setState({
      showInput: !this.state.showInput,
    })
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="update-account-info-item" style={wrapStyle}>
        {
          this.state.showInput === false ? (
            <a href="javascript:;" className="btn-start-update" onClick={this.toggleShowInput}>修改</a>
          ) : (
            <div className="input-wrap">
              {
                this.props.inputType === 'input' && (
                  <Input placeholder={this.props.placeholder} />
                )
              }
              {
                this.props.inputType === 'select' && (
                  <Select value={0}>
                    {
                      _.map(this.props.options, (option, index) => (
                        <Select.Option value={index}>{option}</Select.Option>
                      ))
                    }
                  </Select>
                )
              }
              <Button className="btn-submit" onClick={this.toggleShowInput}>提交</Button>
            </div>
          )
        }
      </div>
    )
  }
}
