import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Layout } from 'antd'

import {
  Header,
  Footer,
} from '../components'
import { DashBoard } from '../pages'
import './App.less'

export default class App extends Component {
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
      <div className="app_wrap" style={wrapStyle}>
        <Layout.Header className="layout-header-wrap">
          <Header
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              padding: '0 60px',
            }}
          />
        </Layout.Header>
        <Layout.Content>
          <div className="main-content-wrap">
            <DashBoard />
          </div>
        </Layout.Content>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </div>
    )
  }
}
