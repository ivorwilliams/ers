import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps'
import uniqBy from 'lodash/fp/uniqBy'

class Locations extends React.Component {

  static propTypes = {
    markers: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        position: React.PropTypes.shape({
          lat: React.PropTypes.number.isRequired,
          lng: React.PropTypes.number.isRequired
        }).isRequired,
        hotspot: React.PropTypes.bool.isRequired
      }).isRequired
    ).isRequired
  }

  render() {
    return (
      // TODO: fix up this quick-n-dirty cut-paste from https://github.com/tomchentw/react-google-maps
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
              ref={(map) => console.log(map)}
              defaultZoom={10}
              defaultCenter={{ lat: 43.6504268, lng: -79.4595838 }}
            >
            {this.props.markers.map((marker, index) => {
              return (
                <Marker
                  {...marker}
                  onRightclick={() => this.props.onMarkerRightclick(index)} />
              );
            })}
            </GoogleMap>
          }
        />
      </section>
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
    markers: uniqBy('key')(filteredObservations.map(observationToLocation))
  }
}

const observationToLocation = (observation) => {
  return {
    key: observation.locID,
    name: observation.locName,
    position: {
      lat: observation.lat,
      lng: observation.lng
    },
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
