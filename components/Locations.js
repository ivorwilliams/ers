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
              <a href={this.urlFor(location)}>
                {location.name} ({location.id})</a>
                lat={location.lat}, lng={location.lng}
              )
            </li>
          )}
        </ul>
      </div>
    )
  }

  urlFor(location) {
    return location.hotspot ? `http://ebird.org/ebird/hotspot/${location.id}` : '#'
  }
}

const mapStateToProps = (state) => {
  return {
    locations: uniqBy('id')(state.observations.map(observationToLocation))
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
