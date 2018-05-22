import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Row, Col } from 'antd'
import _ from 'lodash'

import { Filter, TeacherPreview } from '../../components'

export default class extends React.Component {
  static propTypes = {
    majors: PropTypes.bool,
  };

  static defaultProps = {
    majors: false,
  };

  state = {
    teachers: [],
  }

  componentDidMount = async () => {
    const res = await fetch('/api/users?role_id=teacher')
    if (res.status === 200) {
      const data = await res.json()
      this.setTeachers(data)
    }
  }

  setTeachers = teachers => (
    this.setState({
      teachers,
    })
  )

  render() {
    return (
      <Layout>
        <Layout.Sider width="300">
          <Filter majors={this.props.majors} setTeachers={this.setTeachers} />
        </Layout.Sider>

        <Layout.Content style={{ marginTop: '-10px' }}>
          <Row>
            {
              _.map(this.state.teachers, (teacher, index) => (
                <Col key={index}>
                  <TeacherPreview teacher={teacher} />
                </Col>
              ))
            }
          </Row>
        </Layout.Content>
      </Layout>
    )
  }
}
