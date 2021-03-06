import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import uniqBy from 'lodash/fp/uniqBy'

class Species extends React.Component {

  static propTypes = {
    species: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        sciName: React.PropTypes.string.isRequired,
        comName: React.PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }

  render() {
    return (
      <div className="species">
        <ul>
          {this.props.species.map(sp =>
            <li key={sp.sciName}>{sp.comName}</li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let filteredObservations = state
    .observations
    .filter(x => state.filters.re.test(x.comName))
    .filter(x => x.notable || !state.filters.notableOnly)
  return {
    species: uniqBy('sciName')(filteredObservations.map(observationToSpecies))
  }
}

const observationToSpecies = (observation) => {
  return {
    sciName: observation.sciName,
    comName: observation.comName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Species)
