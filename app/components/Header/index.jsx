import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import HeaderButton from '../HeaderButton'
import './index.less'

export default class Header extends Component {
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
      <div className="header-wrap" style={wrapStyle}>
        <div className="header-content-wrap">
          <div className="position-wrap">
            <Link to="/" >
              <span className="icon-logo">xfolio logo</span>
            </Link>
            <div className="button-wrap">
              <HeaderButton>
                <Link to={false ? '/teachers' : '/init-teacher-filter'} >寻找导师</Link>
              </HeaderButton>
              <HeaderButton>
                <Link to="/signup-as-teacher" >成为导师</Link>
              </HeaderButton>
              <HeaderButton>
                <Link to="/resource" >资源</Link>
              </HeaderButton>
              <HeaderButton>
                <Link to="/help" >帮助</Link>
              </HeaderButton>
            </div>
          </div>
          <div className="position-wrap">
            <HeaderButton>
              <Link to="/signin" >登录</Link>
            </HeaderButton>
          </div>
        </div>
      </div>
    )
  }
}
