import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Anchor, Divider, Select, Radio, Pagination } from 'antd'
import uuidv4 from 'uuid/v4'

import { TeacherInfoSnapshot } from '../../components'
import './index.less'

export default class Teachers extends Component {
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
      <div className="teachers-wrap" style={wrapStyle}>
        <Anchor
          showInkInFixed={false}
          getContainer={() => (document.body)}
        >
          <div className="teachers-filter-wrap">
            <div className="filter-item-wrap">
              <h4 className="title">专业</h4>
              <Divider />
              <Select
                value={1}
              >
                <Select.Option value={1}>建筑</Select.Option>
                <Select.Option value={2}>服装</Select.Option>
              </Select>
            </div>
            <div className="filter-item-wrap">
              <h4 className="title">申请国家</h4>
              <Divider />
              <Select
                value={1}
              >
                <Select.Option value={1}>中国</Select.Option>
                <Select.Option value={2}>美国</Select.Option>
              </Select>
            </div>
            <div className="filter-item-wrap">
              <h4 className="title">授课方式</h4>
              <Divider />
              <Select
                value={3}
              >
                <Select.Option value={1}>线上</Select.Option>
                <Select.Option value={2}>线下</Select.Option>
                <Select.Option value={3}>不限</Select.Option>
              </Select>
            </div>
            <div className="filter-item-wrap">
              <h4 className="title">性别</h4>
              <Divider />
              <Select
                value={3}
              >
                <Select.Option value={1}>男</Select.Option>
                <Select.Option value={2}>女</Select.Option>
                <Select.Option value={3}>不限</Select.Option>
              </Select>
            </div>
            <div className="filter-item-wrap">
              <h4 className="title">城市</h4>
              <Divider />
              <Select
                value={1}
              >
                <Select.Option value={1}>北京</Select.Option>
                <Select.Option value={2}>上海</Select.Option>
              </Select>
            </div>
            <div className="filter-item-wrap">
              <h4 className="title">价格</h4>
              <Divider />
              <Radio.Group
                defaultValue={1}
              >
                <Radio value={1}>由低到高</Radio>
                <Radio value={2}>由高到低</Radio>
              </Radio.Group>
            </div>
          </div>
        </Anchor>
        <div className="teacher-list-wrap">
          <div className="content-wrap">
            {
              _.times(10, () => (
                <TeacherInfoSnapshot key={uuidv4()} />
              ))
            }
          </div>
          <Pagination defaultCurrent={6} total={500} />
        </div>
      </div>
    )
  }
}
