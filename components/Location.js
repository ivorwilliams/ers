import React, { PropTypes } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
import { connect } from 'react-redux'
import { selectLocation } from '../actions/selections.js'

class Location extends React.Component {

  static propTypes = {
    locID: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    position: React.PropTypes.shape({
      lat: React.PropTypes.number.isRequired,
      lng: React.PropTypes.number.isRequired
    }).isRequired,
    selectedLocID: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <Marker
        { ...this.props }
        onClick={ () => this.props.onClick(this) }
        >
        { this.props.selected ? this.renderInfoWindow(this.props.observations) : null }
      </Marker>
    )
  }

  renderInfoWindow(observations) {
    return (
      <InfoWindow
      >
        <div>
          { observations.map(x => `${x.comName} - ${x.howMany}`).join(', ') }
        </div>
      </InfoWindow>
    )
  }

}

const mapStateToProps = (state, props) => {
  let filteredObservations = state
    .observations
    .filter(x => state.filters.re.test(x.comName))
    .filter(x => x.notable || !state.filters.notableOnly)
  let observations = filteredObservations
    .filter(x => x.locID === props.locID)
  return {
    selected: props.locID == state.selections.locID,
    observations: observations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (m) => {
      dispatch(selectLocation(m.props.locID))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)
