import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { UpdateAccountInfoItem } from '../../components'
import './index.less'

export default class StudentBasicAccountInfo extends Component {
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
      <div className="student-basic-account-info" style={wrapStyle}>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">姓名</p>
            <p className="item-value">张三</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              placeholder="请输入新姓名"
            />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">性别</p>
            <p className="item-value">男</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">电话</p>
            <p className="item-value">18000000000</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">邮箱</p>
            <p className="item-value">xxx@xxx.com</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">申请专业</p>
            <p className="item-value">服装；纺织面料</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">授课形式</p>
            <p className="item-value">不限</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="select"
              options={['不限', '线上', '线下']}
            />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">申请学历</p>
            <p className="item-value">硕士</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem
              inputType="select"
              options={['硕士', '博士']}
            />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">目标院校</p>
            <p className="item-value">xxx University</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem />
          </div>
        </div>
        <div className="account-info-item">
          <div className="current-info">
            <p className="item-title">申请国家</p>
            <p className="item-value">美国</p>
          </div>
          <div className="update-account-info-item">
            <UpdateAccountInfoItem />
          </div>
        </div>
      </div>
    )
  }
}
