import React from 'react'
import PropTypes from 'prop-types'

export default class Loading extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    isLoading: true,
    children: null,
  };

  render() {
    const { isLoading } = this.props
    return (
      <div className={isLoading ? 'App-spinner' : null}>
        <div className={isLoading ? 'App-translucent' : null}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
