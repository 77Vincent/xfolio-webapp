import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Divider } from 'antd'
import { InfoInput, Calendar } from '../'

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
          valueClassName="xfolio-text-primary"
          className="xfolio-section"
          onChange={(e) => {
            this.props.updateUser({
              userId: this.props.accountInfo.id,
              payload: e.target.value,
            })
            this.setState({ isEdit: false })
          }}
        />

        <Divider />

        <InfoInput
          label="平台服务费比例"
          default={`${100 - accountInfo.commission}%`}
          isEdit={this.state.isEdit}
          className="xfolio-section"
          type="number"
        />

        <Divider />

        <h5 className="xfolio-text-title-s">时间安排</h5>
        <p className="calendar-tip">请至少填写您当月可用于教学的时间表</p>

        <Divider />

        <Calendar />
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
