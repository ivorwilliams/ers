import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import uniqBy from 'lodash/fp/uniqBy'
import { selectLocation } from '../actions/selections.js'

class Locations extends React.Component {

  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    selectedLocID: React.PropTypes.string,
    markers: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
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
            {this.props.markers.map(marker => {
              return (
                <Marker
                  {...marker}
                  onClick={ () => this.props.onClick(marker) } >
                  { marker.key == this.props.selectedLocID ? this.renderInfoWindow(this.props.observations) : null }
                </Marker>
              );
            })}
            </GoogleMap>
          }
        />
      </section>
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

  // TODO: Ugh.  This is called as the user types and filters the selection.
  // TODO: Perhaps listen for fetches to finish, zoom once, then no more
  zoomMapToMarkers(map) {
    if (map) {
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
  let observationsForSelectedLocation = state
    .observations
    .filter(x => x.locID === state.selections.locID)
  return {
    markers: uniqBy('key')(filteredObservations.map(observationToLocation)),
    selectedLocID: state.selections.locID,
    observations: observationsForSelectedLocation
  }
}

const observationToLocation = (observation) => {
  return {
    key: observation.locID,
    title: observation.locName,
    position: {
      lat: observation.lat,
      lng: observation.lng
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (m) => {
      dispatch(selectLocation(m.key))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Locations)
