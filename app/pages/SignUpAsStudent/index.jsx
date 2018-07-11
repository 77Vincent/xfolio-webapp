import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button } from 'antd'
import { connect } from 'react-redux'

import { SignUpInputAccountInfo } from '../../components'
import { Request, transformUserInfo, dressUpAfterSignIn } from '../../utils'
import { USER_ROLE } from '../../Consts'
import constDataHolder from '../../store/constDataHolder'
import './index.less'

class SignUpAsStudent extends Component {
  static propTypes = {
    style: PropTypes.object,
    updateAccountInfo: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  state = {
    loading: false,
  }

  handleSubmitSignUp = (data) => {
    this.setState({ loading: true })
    Request.signUp({
      role_id: USER_ROLE.STUDENT,
      mobilephone: data.mobilephone,
      password: data.password,
    }).timeout(10000).then((res) => {
      this.handleSignUpSuccess(res.body)
    }).catch((err) => {
      log('signUp error ', err)
    })
  }

  handleSignUpSuccess = (responseBody) => {
    const accountInfo = responseBody.data
    window.accountInfo = accountInfo
    constDataHolder.apiToken = responseBody.token
    // 初始化数据
    dressUpAfterSignIn(accountInfo.id, constDataHolder.apiToken)
    this.props.updateAccountInfo(transformUserInfo(accountInfo))
    this.props.history.push('/dashboard/profile')
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="sign-up-as-student" style={wrapStyle}>
        <h2 className="title">新用户注册</h2>
        <SignUpInputAccountInfo
          style={{
            width: '300px',
          }}
          submitButton={(
            <Button
              className="btn-submit-form"
              loading={this.state.loading}
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
})

export default connect(null, mapDispatchToProps)(SignUpAsStudent)
