import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../actions/controls.js'

class Controls extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="controls">
        <input
          type="text"
          placeholder="Filter names..."
          onChange={this.props.onChange}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (e) => {
      dispatch(setFilter(e.target.value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
