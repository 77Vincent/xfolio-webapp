import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import cx from 'classnames'
import { Anchor, Divider, Select, Radio, Button, Icon, Tag, Pagination } from 'antd'

import { getImage } from '../../utils'
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
              <h4 className="title">城市</h4>
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
                <div className="teacher-info-item">
                  <img src={getImage('default-teacher-avatar-470-21-.png')} alt="" className="teacher-avatar" />
                  <div className="teacher-info-detail">
                    <p className="teacher-name">马天驰</p>
                    <div className="teacher-tags">
                      <Tag>名校毕业</Tag>
                      <Tag>风趣</Tag>
                      <Tag>教学经验</Tag>
                      <Tag>工作经验</Tag>
                    </div>
                    <div className="education-detail">
                      <p className="item">毕业于：Architectual Association</p>
                      <p className="item">指导学生数：100</p>
                      <p className="item">现有学生：10</p>
                      <p className="item">学生录取院校：AA；UCL</p>
                      <p className="item">本周可约课时：0</p>
                    </div>
                    <div className="operas-wrap">
                      <a href="javascript:;" className="btn-favorite">
                        {
                          false ? (
                            <Icon type="star-o" />
                          ) : (
                            <Icon type="star" />
                          )
                        }
                      </a>
                      <Button
                        className={cx({
                          'btn-order': true,
                          disabled: false,
                        })}
                        disabled
                      >
                        预约
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <Pagination defaultCurrent={6} total={500} />
        </div>
      </div>
    )
  }
}
