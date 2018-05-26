import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Progress, Radio, Select } from 'antd'
import uuidv4 from 'uuid/v4'
import cx from 'classnames'

import filterStepInfo from './filterStepInfo'
import './index.less'

export default class InitTeacherFilter extends Component {
  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  state = {
    stepIndex: 0,
    filterInitResult: _.times(filterStepInfo.length, () => -1), // 初始化结果，默认值为-1，表示都跳过
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  updateStepIndex = (payload) => {
    const currentStepIndex = this.state.stepIndex
    if ((payload === -1 && currentStepIndex > 0) || (payload === 1 && currentStepIndex < filterStepInfo.length - 1)) {
      this.setState({
        stepIndex: currentStepIndex + payload,
      })
    }
  }

  handleClickStepBack = () => {
    this.updateStepIndex(-1)
  }

  handleClickStepSkip = () => {
    this.updateStepIndex(1)
  }

  handleUserSelectStepOption = (stepIndex, optionIndex) => {
    this.state.filterInitResult[stepIndex] = optionIndex
    this.setState({
      filterInitResult: this.state.filterInitResult,
    })
    setTimeout(() => {
      this.updateStepIndex(1)
    }, 50)
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const currentFilterStepInfo = filterStepInfo[this.state.stepIndex]
    const filterStepInitedNumber = (
      _.sumBy(this.state.filterInitResult, value => (
        value === -1 ? 0 : 1
      ))
    ) // 已经选择过的步骤数

    return (
      <div className="init-teacher-filter" style={wrapStyle}>
        <div className="filter-steps-wrap">
          <div className="content-wrap">
            <div className="filter-step filter-step-one">
              <p className="title">{currentFilterStepInfo.title}</p>
              {
                currentFilterStepInfo.type === 'radio' ? (
                  <Radio.Group
                    name={currentFilterStepInfo.name}
                    value={this.state.filterInitResult[this.state.stepIndex]}
                    onChange={(e) => {
                      this.handleUserSelectStepOption(this.state.stepIndex, e.target.value)
                    }}
                    key={uuidv4()}
                  >
                    {
                      _.map(currentFilterStepInfo.options, option => (
                        <Radio.Button value={option.value} key={uuidv4()}>{option.intro}</Radio.Button>
                      ))
                    }
                  </Radio.Group>
                ) : ((() => {
                  const result = this.state.filterInitResult[this.state.stepIndex]
                  return (
                    <Select
                      value={result === -1 ? currentFilterStepInfo.options[0].value : result}
                      onSelect={(value) => {
                        this.handleUserSelectStepOption(this.state.stepIndex, value)
                      }}
                    >
                      {
                        _.map(currentFilterStepInfo.options, option => (
                          <Select.Option value={option.value} key={uuidv4()}>{option.intro}</Select.Option>
                        ))
                      }
                    </Select>
                  )
                })())
              }
            </div>
            <div className="step-opera-wrap">
              <a
                href="javascript:;"
                className={cx({
                  'opera-btn': true,
                  hide: this.state.stepIndex === 0,
                })}
                onClick={this.handleClickStepBack}
              >
                后退
              </a>
              <a
                href="javascript:;"
                className={cx({
                  'opera-btn': true,
                  hide: this.state.stepIndex === filterStepInfo.length - 1,
                })}
                onClick={this.handleClickStepSkip}
              >
                跳过
              </a>
            </div>
          </div>
        </div>
        <div className="filter-init-progress">
          <Progress
            type="circle"
            percent={(filterStepInitedNumber / filterStepInfo.length) * 100}
            width={200}
          />
        </div>
      </div>
    )
  }
}
