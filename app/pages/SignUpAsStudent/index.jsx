import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button } from 'antd'
import { connect } from 'react-redux'

import { SignUpInputAccountInfo } from '../../components'
import { Request, transformUserInfo } from '../../utils'
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER_ID, USER_ROLE } from '../../Consts'
import constDataHolder from '../../store/constDataHolder'
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
      password: data.password,
    }).timeout(5000).then((res) => {
      this.handleSignUpSuccess(res.body)
    }).catch((err) => {
      log('signUp error ', err)
    })
  }

  handleSignUpSuccess = (responseBody) => {
    const accountInfo = JSON.parse(responseBody.data)
    window.accountInfo = accountInfo
    constDataHolder.apiToken = responseBody.token
    localStorage.setItem(LOCAL_STORAGE_TOKEN, constDataHolder.apiToken)
    localStorage.setItem(LOCAL_STORAGE_USER_ID, accountInfo.id)
    this.props.updateAccountInfo(transformUserInfo(accountInfo))
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
