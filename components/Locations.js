import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import uniqBy from 'lodash/fp/uniqBy'

class Locations extends React.Component {

  static propTypes = {
    locations: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        lat: React.PropTypes.number.isRequired,
        lng: React.PropTypes.number.isRequired,
        hotspot: React.PropTypes.bool.isRequired
      }).isRequired
    ).isRequired
  }

  render() {
    return (
      <div className="locations">
        <ul>
          {this.props.locations.map(location =>
            <li key={location.id}>
              <a href={this.urlForLocation(location)}>
                {location.name}
              </a>,
              (<a href={this.urlForLatLng(location.lat, location.lng)}>
                map
              </a>)
            </li>
          )}
        </ul>
      </div>
    )
  }

  urlForLocation(location) {
    return location.hotspot ? `http://ebird.org/ebird/hotspot/${location.id}` : '#'
  }

  urlForLatLng(lat, lng) {
    return `https://maps.google.com/maps?q=${lat},${lng}`
  }
}

const mapStateToProps = (state) => {
  let filteredObservations = state
    .observations
    .filter(x => x.comName.toLowerCase().indexOf(state.filters.text) != -1)
  return {
    locations: uniqBy('id')(filteredObservations.map(observationToLocation))
  }
}

const observationToLocation = (observation) => {
  return {
    id: observation.locID,
    name: observation.locName,
    lat: observation.lat,
    lng: observation.lng,
    hotspot: !observation.locationPrivate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Locations)
