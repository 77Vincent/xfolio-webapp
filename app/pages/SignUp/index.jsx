import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import './index.less'

export default class SignUp extends Component {
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
      <div className="sign-up-wrap" style={wrapStyle}>
        sign-up-wrap
      </div>
    )
  }
}
