import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fooDuck } from '../../ducks'

// TODO
/* eslint-disable react/no-unused-prop-types */
class About extends React.Component {
  static propTypes = {
    foo: PropTypes.object.isRequired,
    fooActions: PropTypes.object.isRequired,
  }

  static defaultProps = {
  };

  constructor(props) {
    super(props)
    this.props.fooActions.callFoo()
  }

  render() {
    return (
      <div className="About" />
    )
  }
}

const mapStateToProps = state => ({
  foo: state.foo,
})

const mapDispatchToProps = dispatch => ({
  fooActions: bindActionCreators(fooDuck.creators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(About)
