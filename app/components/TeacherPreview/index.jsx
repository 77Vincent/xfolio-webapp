import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Button } from 'antd'
import './index.less'

export default class extends React.Component {
  static propTypes = {
    teacher: PropTypes.object,
  }

  static defaultProps = {
    teacher: {},
  };

  render() {
    const { teacher } = this.props
    const brief = teacher.bio.length <= 50 ? teacher.bio : `${teacher.bio.slice(0, 50)}...`

    return (
      <div className="Teacher-Preview">
        <h2>{teacher.name}</h2>
        <p>{brief}</p>

        <Icon type="heart" className="btn-like" />
        <Button className="btn-learn" size="large" type="primary">跟ta学习</Button>
      </div>
    )
  }
}
