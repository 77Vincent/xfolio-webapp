import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
// import PropTypes from 'prop-types'
import BigCalendar from 'react-big-calendar'
import { Modal, Switch, Row, Col } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './index.less'

BigCalendar.momentLocalizer(moment)

class XfolioCalendar extends Component {
  static propTypes = {
    // accountInfo: PropTypes.object.isRequired,
    // updateUser: PropTypes.func.isRequired,
  }

  state = {
    events: [],
    newEvent: {},
    isEditing: false,
  }

  render() {
    const { events } = this.state
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
            events.push(newEvent)
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
            <div className="xfolio-text-title-s xfolio-divider">重复模式</div>

            <Row type="flex" justify="space-between">
              <Col><span className="xfolio-text-info-value">仅当天</span></Col>
              <Col><Switch defaultChecked /></Col>
            </Row>

            <Row type="flex" justify="space-between">
              <Col><span className="xfolio-text-info-value">本周此时段</span></Col>
              <Col><Switch /></Col>
            </Row>

            <Row type="flex" justify="space-between">
              <Col><span className="xfolio-text-info-value">本月此时段</span></Col>
              <Col><Switch /></Col>
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
            newEvent = {
              id: uuidv4(),
              title: 'Available',
              start: e.start,
              end: e.end,
            }
            this.setState({ newEvent })
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
