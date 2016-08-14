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
        title: React.PropTypes.string.isRequired,
        position: React.PropTypes.shape({
          lat: React.PropTypes.number.isRequired,
          lng: React.PropTypes.number.isRequired
        }).isRequired
      }).isRequired
    ).isRequired
  }

  render() {
    return (
      // TODO: infowindow showing bird info
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

  // TODO: Ugh.  This is called as the user types and filters the selection.
  // TODO: Perhaps listen for fetches to finish, zoom once, then no more
  zoomMapToMarkers(map) {
    if (map) {
      // console.log(`zooming map to ${this.props.markers.length} markers`)
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
    markers: uniqBy('locID')(filteredObservations.map(observationToLocation))
  }
}

const observationToLocation = (observation) => {
  return {
    locID: observation.locID,
    title: observation.locName,
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
