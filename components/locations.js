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
    if (map && !this.props.fetching && this.props.markers.length > 0) {
      console.log(`zooming map to ${this.props.markers.length} markers`)
      let mapBounds = this.props.markers
        .map(m => new google.maps.LatLng(m.position))
        .reduce(
          (bounds, ll) => bounds.extend(ll),
          new google.maps.LatLngBounds()
        )
      this.extendToMinimum(mapBounds)
      map.fitBounds(mapBounds)
    }
  }

  /*
   * Without this, er, feature, when we are only showing one marker we will end
   * up zooming in very close.  If the marker is in the middle of a wetland or
   * woodland area, then we may be left viewing an entirely blue or green map.
   * So, this hack ensures that we don't zoom in too close.
   *
   * It's a shame that react-google-maps doesn't expose the setZoom() method,
   * because getting and setting would do the trick.
   */
  extendToMinimum(bounds) {
    const minimumSpan = 0.025 // Arbitrary span, looks about right
    if (bounds.toSpan().lat() < minimumSpan && bounds.toSpan().lng() < minimumSpan) {
      let center = bounds.getCenter()
      bounds.extend(new google.maps.LatLng({
        lat: center.lat() + minimumSpan,
        lng: center.lng() + minimumSpan
      }))
      bounds.extend(new google.maps.LatLng({
        lat: center.lat() - minimumSpan,
        lng: center.lng() - minimumSpan
      }))
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
