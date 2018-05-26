import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button } from 'antd'

import { SignUpInputAccountInfo } from '../../components'
import './index.less'

export default class SignUpAsStudent extends Component {
  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  componentDidMount() {

  }

  componentWillUnmount() {

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
        />
        <Button className="btn-submit-form">提交</Button>
      </div>
    )
  }
}
