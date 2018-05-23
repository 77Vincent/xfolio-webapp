import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import './index.less'

export default class HeaderButton extends Component {
  static propTypes = {
    style: PropTypes.object,
    content: PropTypes.string.isRequired,
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
      <div className="header-button-wrap" style={wrapStyle}>
        {this.props.content}
      </div>
    )
  }
}
