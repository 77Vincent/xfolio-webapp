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
          <span>© 2018 对页教育科技（上海）有限公司</span>
          <span>沪ICP备18020158号</span>
        </div>
      </div>
    )
  }
}
