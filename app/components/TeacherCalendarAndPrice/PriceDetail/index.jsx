import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input, Button } from 'antd'

import './index.less'

export default class PriceDetail extends Component {
  static propTypes = {
    style: PropTypes.object,
    type: PropTypes.string,
    price: PropTypes.number,
  };

  static defaultProps = {
    style: {},
    type: '',
    price: 0,
  };

  state = {
    editMode: false,
    price: this.props.price,
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
    })
  }

  handleSubmitEditPrice = () => {
    this.toggleEditMode();
  }

  render() {
    const wrapStyle = _.assign({}, this.props.style)

    return (
      <div className="price-detail" style={wrapStyle}>
        {
          this.props.type && (
            <span className="price-type">{this.props.type}</span>
          )
        }
        <span className="current-price">¥{this.state.price}/h</span>
        {
          this.state.editMode === false && (
            <a href="javascript:;" className="btn-edit-price" onClick={this.toggleEditMode}>修改</a>
          )
        }
        {
          this.state.editMode === true && (
            <div className="edit-price-wrap">
              <Input placeholder="请输入新价格" type="number"/>
              <Button onClick={this.handleSubmitEditPrice}>确定</Button>
            </div>
          )
        }
      </div>
    )
  }
}
