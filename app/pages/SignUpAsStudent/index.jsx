import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button } from 'antd'
import { connect } from 'react-redux'

import { SignUpInputAccountInfo } from '../../components'
import { Request } from '../../utils'
import { USER_ROLE } from '../../Consts'
import './index.less'

class SignUpAsStudent extends Component {
  static propTypes = {
    style: PropTypes.object,
    updateAccountInfo: PropTypes.func.isRequired,
    updateUserSignInStatus: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleSubmitSignUp = (data) => {
    Request.signUp({
      role_id: USER_ROLE.STUDENT,
      mobilephone: data.mobilephone,
      password: data.passsword,
    }).timeout(2000).catch(() => { // TODO then 的时候处理
      this.handleSignUpSuccess(data)
    }).then(() => {

    })
  }

  handleSignUpSuccess = (data) => {
    this.props.updateAccountInfo({
      mobileNumber: data.mobilephone,
      userRole: USER_ROLE.STUDENT,
    })
    this.props.updateUserSignInStatus(true)
    this.props.history.push('/dashboard/profile')
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="sign-up-as-student" style={wrapStyle}>
        <h2 className="title">新用户注册</h2>
        <SignUpInputAccountInfo
          style={{
            width: '290px',
          }}
          submitButton={(
            <Button
              className="btn-submit-form"
              type="primary"
              htmlType="submit"
            >
              提交
            </Button>
          )}
          onSubmit={this.handleSubmitSignUp}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateAccountInfo: dispatch.AccountInfo.updateAccountInfo,
  updateUserSignInStatus: dispatch.AppStatus.updateUserSignInStatus,
})

export default connect(null, mapDispatchToProps)(SignUpAsStudent)
