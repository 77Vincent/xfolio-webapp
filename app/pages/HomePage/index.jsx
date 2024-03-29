import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Carousel, Button } from 'antd'
import { Link } from 'react-router-dom'
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'

import { getImage } from '../../utils'
import './index.less'

class HomePage extends Component {
  static propTypes = {
    style: PropTypes.object,
    teacherFilterInited: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="home-page-wrap" style={wrapStyle}>
        <div className="slide-playground-wrap">
          <Carousel
            effect="fade"
            dots={false}
            autoplay
            speed={1000}
            lazyLoad={false}
          >
            <div className="slide-wrap">
              <div
                className="slide-bg-image"
                style={{
                  backgroundImage: `url("${getImage('bg-7.jpg')}")`,
                }}
              />
              <p className="slide-intro">找到你的设计导师</p>
            </div>
            <div className="slide-wrap">
              <div
                className="slide-bg-image"
                style={{
                  backgroundImage: `url("${getImage('bg-3.jpg')}")`,
                }}
              />
              <p className="slide-intro color-white">分享设计知识</p>
            </div>
            <div className="slide-wrap">
              <div
                className="slide-bg-image"
                style={{
                  backgroundImage: `url("${getImage('bg-4.jpg')}")`,
                }}
              />
              <p className="slide-intro color-white">一站式、沉浸式设计教学体验</p>
            </div>
            <div className="slide-wrap">
              <div
                className="slide-bg-image"
                style={{
                  backgroundImage: `url("${getImage('bg-5.jpg')}")`,
                }}
              />
              <p className="slide-intro">迎接设计教育新纪元</p>
            </div>
          </Carousel>
          <Button
            type="primary"
            className="slide-button"
          >
            <Link to={this.props.teacherFilterInited ? '/teachers' : '/init-teacher-filter'}>发现导师</Link>
          </Button>
        </div>
        <div className="content-wrap">
          <div className="content-tabs">
            <a href="#about" className="content-tab">关于我们</a>
            <a href="#stories" className="content-tab">ta的故事</a>
          </div>
          <div className="content-details">
            <div className="content-about-us">
              <a id="about" className="anchor" >about us</a>
              <p className="title">关于我们</p>
              <p className="content">
                {'X-folio会先通过辅导设计留学作品集的方式，传递设计价值，' +
                '用收益来帮助设计师打造个人品牌形象，设计产品。全面推广个人品牌、' +
                '设计教育、设计产品，有收益打造全设计交互平台，展现每一个人的设计才华，' +
                '把设计变为沟通的桥梁，让更多的人参与到设计中来，感受创作的乐趣，一起用设计改变世界。'}
              </p>
            </div>
            <div className="content-user-stories">
              <a id="stories" className="anchor" >user-stories</a>
              <p className="title">ta的故事</p>
              <div className="user-stories">
                {
                  _.times(3, () => (
                    <div className="user-story" key={uuidv4()}>
                      <img src={getImage('user-story-temp-image-464-300.png')} alt="" className="user-image" />
                      <p className="story-content">
                        {'-folio会先通过辅导设计留学作品集的方式，' +
                        '传递设计价值，用收益来帮助设计师打造个人品牌形象，' +
                        '设计产品。全面推广个人品牌、设计教育、设计产品，' +
                        '有收益打造全设计交互平台，展现每一个人的设计才华，' +
                        '把设计变为沟通的桥梁，让更多的人参与到设计中来，' +
                        '感受创作的乐趣，一起用设计改变世界。'}
                      </p>
                    </div>
                  ))
                }
              </div>
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

export default connect(mapStateToProps)(HomePage)
