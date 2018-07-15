import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar'
import { Modal, Switch, Row, Col } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import { DAY_OF_WEEK } from '../../Consts'
import './index.less'

BigCalendar.momentLocalizer(moment)

const modeReference = {
  singleDay: 'singleDay',
  dayOfWeek: 'dayOfWeek',
  everyday: 'everyDay',
}

class XfolioCalendar extends Component {
  static propTypes = {
    // accountInfo: PropTypes.object.isRequired,
    // updateUser: PropTypes.func.isRequired,
  }

  state = {
    events: [],
    newEvent: {},
    isEditing: false,
    mode: null,
  }

  onModeChange = (mode) => {
    return () => {
      this.setState({ mode })
    }
  }

  render() {
    const { events, mode } = this.state
    let { newEvent } = this.state
    // const { accountInfo } = this.props

    return (
      <div className="xfolio-calendar">
        <Modal
          className="xfolio-calendar-editing"
          width="300px"
          visible={this.state.isEditing}
          closable={false}
          onCancel={() => {
            this.setState({ isEditing: false })
          }}
          onOk={() => {
            if (this.state.mode === modeReference.singleDay) {
              events.push(newEvent)
            }
            this.setState({ events })
            this.setState({ isEditing: false })
          }}
        >
          <div className="xfolio-section">
            <h5>{ moment(newEvent.start).format('LL') }</h5>
            <div className="timeframe">
              <span>{ moment(newEvent.start).format('LT') }</span>
              -
              <span>{ moment(newEvent.end).format('LT') }</span>
            </div>
          </div>

          <div className="xfolio-section">
            <div className="xfolio-text-title-s">重复模式</div>

            <Row type="flex" justify="space-between">
              <Col>
                <span
                  className={
                    `xfolio-text-info-value ${mode === modeReference.singleDay ? 'xfolio-color-primary' : ''}`
                  }
                >
                  仅当天
                </span>
              </Col>
              <Col>
                <Switch
                  checked={mode === modeReference.singleDay}
                  onChange={this.onModeChange(modeReference.singleDay)}
                />
              </Col>
            </Row>

            <Row type="flex" justify="space-between">
              <Col>
                <span
                  className={
                    `xfolio-text-info-value ${mode === modeReference.dayOfWeek ? 'xfolio-color-primary' : ''}`
                  }
                >
                  本月每个{DAY_OF_WEEK[moment(newEvent.start).weekday()]}
                </span>
              </Col>
              <Col>
                <Switch
                  checked={mode === modeReference.dayOfWeek}
                  onChange={this.onModeChange(modeReference.dayOfWeek)}
                />
              </Col>
            </Row>

            <Row type="flex" justify="space-between">
              <Col>
                <span
                  className={
                    `xfolio-text-info-value ${mode === modeReference.everyday ? 'xfolio-color-primary' : ''}`
                  }
                >
                  本月每一天
                </span>
              </Col>
              <Col>
                <Switch
                  checked={mode === modeReference.everyday}
                  onChange={this.onModeChange(modeReference.everyday)}
                />
              </Col>
            </Row>
          </div>
        </Modal>

        <BigCalendar
          selectable
          views={['week', 'agenda']}
          events={events}
          defaultView={BigCalendar.Views.WEEK}
          onSelectEvent={(e) => {
            // Remove the selected event
            const toRemove = events.filter((v) => {
              return v.id === e.id
            })
            this.setState({ events: _.difference(events, toRemove) })
          }}
          onSelectSlot={(e) => {
            // Prevent from overlap events
            for (let i = 0; i < events.length; i += 1) {
              const newStart = e.start.getTime()
              const newEnd = e.end.getTime()
              const start = events[i].start.getTime()
              const end = events[i].end.getTime()

              if ((newStart >= start && newStart < end) || (newStart <= start && newEnd > start)) {
                return
              }
            }

            const duration = (e.end.getTime() - e.start.getTime()) / 1000 / 60 / 60
            newEvent = {
              id: uuidv4(),
              title: `可预约: ${duration}小时`,
              start: e.start,
              end: e.end,
              duration,
            }
            this.setState({ newEvent })
            this.setState({
              mode: modeReference.singleDay,
            })
            this.setState({ isEditing: true })
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accountInfo: state.AccountInfo,
})

const mapDispatchToProps = dispatch => ({
  updateUser: dispatch.AccountInfo.updateUser,
})

export default connect(mapStateToProps, mapDispatchToProps)(XfolioCalendar)
