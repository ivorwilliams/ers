import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { setNameFilter, setNotableOnly } from '../actions/controls.js'
import { setDistance, setBack } from '../actions/settings.js'
import { fetchLocations } from '../actions/ebird.js'

class Controls extends React.Component {

  static propTypes = {
    notableOnly: React.PropTypes.bool.isRequired,
    byRegion: React.PropTypes.bool.isRequired,
    dist: React.PropTypes.number.isRequired,
    back: React.PropTypes.number.isRequired,
    onNameFilterChange: React.PropTypes.func.isRequired,
    onNotableOnlyChange: React.PropTypes.func.isRequired,
    onDistChange: React.PropTypes.func.isRequired,
    onBackChange: React.PropTypes.func.isRequired
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

        { this.props.byRegion ? null : this.renderDistChanged() }

        Days back:
        <select
          value={this.props.back}
          onChange={this.props.onBackChange}
          >
          {[,...Array(30)].map((x, i) =>
            <option key={i}>{i}</option>
          )}
        </select>
      </div>
    )
  }

  renderDistChanged() {
    return (
      <span>
        Distance
        <select
          value={this.props.dist}
          onChange={this.props.onDistChange}
          >
          {[,...Array(50)].map((x, i) =>
            <option key={i}>{i}</option>
          )}
        </select>
      </span>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notableOnly: state.filters.notableOnly,
    byRegion: state.settings.byRegion,
    dist: state.settings.dist,
    back: state.settings.back
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNameFilterChange: (e) => {
      dispatch(setNameFilter(e.target.value))
    },
    onNotableOnlyChange: (e) => {
      dispatch(setNotableOnly(e.target.checked))
    },
    onDistChange: (e) => {
      dispatch(setDistanceAndFetch(parseInt(e.target.value)))
    },
    onBackChange: (e) => {
      dispatch(setBackAndFetch(parseInt(e.target.value)))
    }
  }
}

function setDistanceAndFetch(dist) {
  return (dispatch, getState) => {
    dispatch(setDistance(dist))
    dispatch(fetchLocations(getState().settings))
  }
}

function setBackAndFetch(dist) {
  return (dispatch, getState) => {
    dispatch(setBack(dist))
    dispatch(fetchLocations(getState().settings))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
