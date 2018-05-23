import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import './index.less'

export default class Footer extends Component {
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
      <div className="footer-wrap" style={wrapStyle}>
        <div className="footer-content-wrap">
          <span>CopyRight 2018</span>
          <span>ICP备案号 123</span>
        </div>
      </div>
    )
  }
}
