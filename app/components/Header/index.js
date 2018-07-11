import React from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon } from 'antd'

import { getImage } from '../../utils'
import './index.less'

const Header = props => (
  <div className="header-wrap">
    <div className="header-content-wrap">
      <div className="position-wrap">
        <Link to="/" >
          <img src={getImage('logo-0611.png')} alt="" className="icon-logo" />
        </Link>
        <div className="button-wrap">
          <NavLink
            to={props.teacherFilterInited ? '/teachers' : '/init-teacher-filter'}
            className="header-nav-button"
            activeClassName="current"
          >
            发现导师
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
          {
            props.alreadySignIn === false ? (
              <NavLink
                to="/signin"
                className="header-nav-button"
                activeClassName="current"
              >
                登录
              </NavLink>
            ) : (
              <NavLink to="/dashboard/profile" className="btn-homepage">
                <Icon type="user" />
              </NavLink>
            )
          }
        </div>
      </div>
    </div>
  </div>
)

Header.propTypes = {
  teacherFilterInited: PropTypes.bool.isRequired,
  alreadySignIn: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  teacherFilterInited: state.AppStatus.teacherFilterInited,
  alreadySignIn: state.AppStatus.alreadySignIn,
})

export default withRouter(connect(mapStateToProps)(Header))
