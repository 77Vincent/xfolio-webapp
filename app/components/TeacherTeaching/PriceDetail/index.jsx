import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Icon, message } from 'antd'
import to from 'await-to'

import './index.less'

export default class PriceDetail extends Component {
  static propTypes = {
    style: PropTypes.object,
    price: PropTypes.number,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
    price: 0,
  };

  state = {
    editMode: false,
    loading: false,
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  inputNewPriceElem;

  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
    })
  }

  handleSubmitEditPrice = async () => {
    const newPrice = _.trim(this.inputNewPriceElem.value)
    if (/^\d+$/.test(newPrice)) {
      this.setState({
        loading: true,
      })
      const [err] = await to(this.props.onSubmit(parseInt(newPrice, 10)))
      if (!err) {
        this.setState({
          loading: false,
        })
        this.inputNewPriceElem.value = ''
        this.toggleEditMode()
        message.success('更新成功！')
      } else {
        message.error('更新出错！')
      }
    } else {
      message.warning('格式错误！')
    }
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="price-detail" style={wrapStyle}>
        <span className="current-price">¥{this.props.price}/h</span>
        {
          this.state.editMode === false && (
            <a href="javascript:;" className="btn-edit-price" onClick={this.toggleEditMode}>
              <Icon type="form" style={{ fontSize: '16px' }} />
            </a>
          )
        }
        {
          this.state.editMode === true && (
            <div className="edit-price-wrap">
              <input className="input-price" placeholder="请输入新价格" ref={(r) => { this.inputNewPriceElem = r }} />
              <Button onClick={this.handleSubmitEditPrice} loading={this.state.loading}>确定</Button>
            </div>
          )
        }
      </div>
    )
  }
}
