import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { setNameFilter, setNotableOnly } from '../actions/controls.js'

class Controls extends React.Component {

  static propTypes = {
    notableOnly: React.PropTypes.bool.isRequired,
    onNameFilterChange: React.PropTypes.func.isRequired,
    onNotableOnlyChange: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="controls">
        <input
          type="text"
          placeholder="Filter names..."
          onChange={this.props.onNameFilterChange}
        />
        <input
          type="checkbox"
          checked={this.props.notableOnly}
          onChange={this.props.onNotableOnlyChange}
        />
        {' '}
        Notable only
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notableOnly: state.filters.notableOnly
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNameFilterChange: (e) => {
      dispatch(setNameFilter(e.target.value))
    },
    onNotableOnlyChange: (e) => {
      dispatch(setNotableOnly(e.target.checked))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
