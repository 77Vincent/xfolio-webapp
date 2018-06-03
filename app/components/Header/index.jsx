import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import './index.less'

class Header extends Component {
  static propTypes = {
    style: PropTypes.object,
    teacherFilterInited: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    style: {},
  }

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
            <Link to="/" >
              <span className="icon-logo">xfolio logo</span>
            </Link>
            <div className="button-wrap">
              <NavLink
                to={this.props.teacherFilterInited ? '/teachers' : '/init-teacher-filter'}
                className="header-nav-button"
                activeClassName="current"
              >
                寻找导师
              </NavLink>
              <NavLink
                to="/signup-as-teacher"
                className="header-nav-button"
                activeClassName="current"
              >
                成为导师
              </NavLink>
              <NavLink
                to="/resource"
                className="header-nav-button"
                activeClassName="current"
              >
                资源
              </NavLink>
              <NavLink
                to="/help"
                className="header-nav-button"
                activeClassName="current"
              >
                帮助
              </NavLink>
            </div>
          </div>
          <div className="position-wrap">
            <div className="button-wrap">
              <NavLink
                to="/signin"
                className="header-nav-button"
                activeClassName="current"
              >
                登录
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  teacherFilterInited: state.AppStatus.teacherFilterInited,
})

export default connect(mapStateToProps)(Header)
