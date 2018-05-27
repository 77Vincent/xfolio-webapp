import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import './index.less'

export default class Teachers extends Component {
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
      <div className="teachers-wrap" style={wrapStyle}>
        <div className="teachers-filter-wrap">

        </div>
      </div>
    )
  }
}
