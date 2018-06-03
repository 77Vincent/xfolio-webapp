import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Progress, Radio, Select } from 'antd'
import uuidv4 from 'uuid/v4'
import cx from 'classnames'
import { connect } from 'react-redux'

import filterStepInfo from './filterStepInfo'
import './index.less'

class InitTeacherFilter extends Component {
  static propTypes = {
    style: PropTypes.object,
    history: PropTypes.object,
    updateTeacherFilterInitStatus: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
    history: {},
  };

  state = {
    stepIndex: 0,
    filterInitResult: [], // 存储用户选择的结果，整数表示选择过，-1表示未选择
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

  updateFilterInitResult = (stepIndex, payload) => {
    this.state.filterInitResult[stepIndex] = payload
    this.setState({
      filterInitResult: this.state.filterInitResult,
    })

    // 所有步骤都做了选择
    if (this.state.filterInitResult.length === filterStepInfo.length) {
      setTimeout(() => {
        this.props.updateTeacherFilterInitStatus(true)
        this.props.history.push('/teachers')
      }, 700)
    }
  }

  handleClickStepBack = () => {
    this.updateStepIndex(-1)
  }

  handleClickStepSkip = () => {
    const stepResult = this.state.filterInitResult[this.state.stepIndex]
    this.updateFilterInitResult(this.state.stepIndex, stepResult === undefined ? -1 : stepResult)
    this.updateStepIndex(1)
  }

  handleUserSelectStepOption = (stepIndex, optionIndex) => {
    this.updateFilterInitResult(stepIndex, optionIndex)
    // 所有步骤都已选择
    if (this.state.filterInitResult.length !== filterStepInfo.length) {
      setTimeout(() => {
        this.updateStepIndex(1)
      }, 200)
    }
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)
    const currentFilterStepInfo = filterStepInfo[this.state.stepIndex]
    const filterStepInitedNumber = (
      _.sumBy(this.state.filterInitResult, value => (
        value === undefined ? 0 : 1
      ))
    ) // 已经选择过的步骤数
    const { stepIndex, filterInitResult } = this.state

    return (
      <div className="init-teacher-filter" style={wrapStyle}>
        <div className="filter-steps-wrap">
          <div className="content-wrap">
            <div className="filter-step filter-step-one">
              <p className="title">{currentFilterStepInfo.title}</p>
              {
                currentFilterStepInfo.type === 'radio' && (
                  <Radio.Group
                    name={currentFilterStepInfo.name}
                    value={filterInitResult[stepIndex]}
                    onChange={(e) => {
                      this.handleUserSelectStepOption(stepIndex, e.target.value)
                    }}
                    key={uuidv4()}
                  >
                    {
                      _.map(currentFilterStepInfo.options, option => (
                        <Radio.Button value={option.value} key={uuidv4()}>{option.intro}</Radio.Button>
                      ))
                    }
                  </Radio.Group>
                )
              }
              {
                currentFilterStepInfo.type === 'select' && ((() => {
                  const result = filterInitResult[stepIndex]
                  return (
                    <Select
                      placeholder="未选择"
                      value={result === -1 ? undefined : result}
                      onSelect={(value) => {
                        this.handleUserSelectStepOption(stepIndex, value)
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
                  hide: stepIndex === 0,
                })}
                onClick={this.handleClickStepBack}
              >
                后退
              </a>
              <a
                href="javascript:;"
                className={cx({
                  'opera-btn': true,
                  hide: (
                    stepIndex === filterStepInfo.length - 1 && filterInitResult[filterStepInfo.length - 1] !== undefined
                  ),
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
            percent={20 + ((filterStepInitedNumber / filterStepInfo.length) * 80)}
            width={200}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateTeacherFilterInitStatus: dispatch.AppStatus.updateTeacherFilterInitStatus,
})

export default connect(null, mapDispatchToProps)(InitTeacherFilter)
