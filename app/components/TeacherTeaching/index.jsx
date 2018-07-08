import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Calendar } from 'antd'
import { connect } from 'react-redux'
import { InfoInput } from '../'

import './index.less'

class TeacherTeaching extends Component {
  static propTypes = {
    accountInfo: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
  }

  state = {
    isEdit: false,
  }

  render() {
    const { accountInfo } = this.props

    return (
      <div className="TeacherTeaching">
        <InfoInput
          label="课时单价"
          default={`¥${accountInfo.cost}/h`}
          isEdit={this.state.isEdit}
          type="number"
          customClass={['xfolio-text-primary']}
          className="xfolio-account-info-item"
          onChange={(e) => {
            this.props.updateUser({
              userId: this.props.accountInfo.id,
              payload: e.target.value,
            })
            this.setState({ isEdit: false })
          }}
        />

        <InfoInput
          label="平台服务费比例"
          default={`${100 - accountInfo.commission}%`}
          isEdit={this.state.isEdit}
          className="xfolio-account-info-item"
          type="number"
        />

        <div className="calendar-wrap">
          <h5 className="xfolio-text-info-title">时间安排</h5>

          <p className="calendar-tip">请至少填写您当月可用于教学的时间表</p>

          <div className="calendar-detail">
            <Calendar
              fullscreen={false}
              disabledDate={(targetDate, currentDate) => {
                return targetDate.month() !== currentDate.month()
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accountInfo: state.AccountInfo,
})

const mapDispatchToProps = dispatch => ({
  updateUser: dispatch.AccountInfo.updateUser,
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherTeaching)
