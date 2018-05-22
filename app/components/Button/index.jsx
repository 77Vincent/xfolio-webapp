import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './index.less'

export default class Button extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    isClicked: false,
  }

  handleClick = () => {
    this.setState({
      isClicked: true,
    })
    setTimeout(() => {
      this.setState({
        isClicked: false,
      })
    }, 300)
  }
  render() {
    return (
      <button
        onClick={this.handleClick}
        className={cx({
          Button: true,
          'Button-click': this.state.isClicked === true,
        })}
        {...this.props}
      >
        <div className="Button-wrapper">
          {this.props.children}
        </div>
      </button>
    )
  }
}
