import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { GoogleMapLoader, GoogleMap } from 'react-google-maps'
import uniqBy from 'lodash/fp/uniqBy'
import Location from './Location.js'

class Locations extends React.Component {

  static propTypes = {
    selectedLocID: React.PropTypes.string,
    markers: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        locID: React.PropTypes.string.isRequired,
        locName: React.PropTypes.string.isRequired,
        position: React.PropTypes.shape({
          lat: React.PropTypes.number.isRequired,
          lng: React.PropTypes.number.isRequired
        }).isRequired
      }).isRequired
    ).isRequired
  }

  render() {
    return (
      <section style={{height: "100%"}} className="locations">
        <GoogleMapLoader
          containerElement={
            <div
              style={{
                height: "100%",
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              ref={ (map) => this.zoomMapToMarkers(map) }
              >
              {this.props.markers.map(marker =>
                <Location key={ marker.locID } { ...marker } />
              )}
            </GoogleMap>
          }
        />
      </section>
    )
  }

  zoomMapToMarkers(map) {
    if (map && !this.props.fetching) {
      console.log(`zooming map to ${this.props.markers.length} markers`)
      let mapBounds = this.props.markers.reduce(
        // TODO: I should be able to simplify the extend() param
        (bounds, m) => bounds.extend(new google.maps.LatLng(m.position.lat, m.position.lng)),
        new google.maps.LatLngBounds()
      )
      map.fitBounds(mapBounds)
    }
  }

}

const mapStateToProps = (state) => {
  let filteredObservations = state
    .observations
    .filter(x => state.filters.re.test(x.comName))
    .filter(x => x.notable || !state.filters.notableOnly)
  return {
    markers: uniqBy('locID')(filteredObservations.map(observationToLocation)),
    fetching: state.fetching != 0
  }
}

const observationToLocation = (observation) => {
  return {
    locID: observation.locID,
    locName: observation.locName,
    position: {
      lat: observation.lat,
      lng: observation.lng
    }
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
