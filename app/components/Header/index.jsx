import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import './index.less'

export default class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  static defaultProps = {}

  links = [{
    label: '寻找导师', to: '/teachers',
  }, {
    label: '关于Xfolio', to: '/about',
  }]

  render() {
    return (
      <div className="Header">
        <Menu mode="horizontal" theme="dark" className="Menu">
          <Menu.Item>
            <Link to="/">
              <div className="App-logo">Xfolio</div>
            </Link>
          </Menu.Item>
          {
            _.map(this.links, (link, index) => (
              <Menu.Item className="Menu-Item" key={index}>
                <Link to={link.to}>{link.label}</Link>
              </Menu.Item>
            ))
          }
          <Menu.Item className="Menu-user">
            <Link to="/dashboard">
              <Icon type="user" className="Icon" />
              {this.props.user ? this.props.user.name : '未登录'}
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
