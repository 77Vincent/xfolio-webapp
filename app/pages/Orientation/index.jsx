import React from 'react'
import { Radio, Progress, Carousel } from 'antd'
import _ from 'lodash'

import './index.less'

export default class Orientation extends React.Component {
  state = {
    progress: 0,
  }

  questions = [{
    title: '目的',
    options: ['冲击大牛', '出国深造', '兴趣爱好'],
  }, {
    title: '申请学位',
    options: ['预科', '本科', '研究生'],
  }, {
    title: '专业',
    options: ['平面设计', '服装设计', '室内设计', '工业设计', '建筑设计', '插画设计', '动画设计', '纯艺术'],
  }, {
    title: '申请时间',
    options: [2018, 2019, 2020, 2021, 2022],
  }, {
    title: '上课方式',
    options: ['家里', '公共场所', '线上', '由导师决定'],
  }, {
    title: '上课时间',
    options: ['', '公共场所', '线上', '由导师决定'],
  }]

  progress = () => {
    this.carousel.next()
    this.setState({
      progress: this.state.progress + Math.ceil(100 / this.questions.length),
    })
  }

  render() {
    return (
      <div className="Orientation">
        <h2>了解你的需求以寻找合适的导师</h2>
        <Progress type="circle" className="Progress" percent={this.state.progress} status="active" />
        <Carousel ref={(r) => { this.carousel = r }} className="Carousel" dots="false" effect="fade">
          {
            _.map(this.questions, (question, index) => (
              <Radio.Group key={index} onChange={this.progress}>
                <h2>{question.title}</h2>
                {
                  _.map(question.options, (option, i) => (
                    <Radio.Button key={index} value={i}>{option}</Radio.Button>
                  ))
                }
              </Radio.Group>
            ))
          }
        </Carousel>
      </div>
    )
  }
}
