import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import HeaderButton from '../HeaderButton'
import './index.less'

export default class AAA extends Component {
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
      <div className="header-wrap" style={wrapStyle}>
        <div className="header-content-wrap">
          <div className="position-wrap">
            <span className="icon-logo">xfolio logo</span>
            <div className="button-wrap">
              <HeaderButton
                content="寻找导师"
              />
              <HeaderButton
                content="成为导师"
              />
              <HeaderButton
                content="资源"
              />
              <HeaderButton
                content="帮助"
              />
            </div>
          </div>
          <div className="position-wrap">
            <div className="button-wrap">
              <HeaderButton
                content="登录"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
