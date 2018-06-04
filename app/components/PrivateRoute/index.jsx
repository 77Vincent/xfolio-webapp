import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import './index.less'

/* eslint-disable react/prop-types */

class PrivateRoute extends Component {
  static propTypes = {
    alreadySignIn: PropTypes.bool.isRequired,
  }

  static defaultProps = {
  }

  render() {
    const {
      component: Comp, render, alreadySignIn, ...rest
    } = this.props
    return (
      <Route
        {...rest}
        render={(
          props => (
            alreadySignIn ? (
              render() || <Comp {...props} />
            ) : (
              <Redirect to="/signin" />
            )
          )
        )}
      />
    )
  }
}

const mapStateToProps = state => ({
  alreadySignIn: state.AppStatus.alreadySignIn,
})

export default connect(mapStateToProps)(PrivateRoute)
