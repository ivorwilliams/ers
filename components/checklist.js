import React, { PropTypes } from 'react'
import { InfoWindow } from 'react-google-maps'
import { connect } from 'react-redux'

class Checklist extends React.Component {

  static propTypes = {
    store: React.PropTypes.object
  }

  render() {
    return (
      <div>
        <div>Location {this.props.locID}</div>
        <ul>
          {this.props.observations.map(obs =>
            <li key={ obs.obsID }>{obs.comName}: {obs.howMany}: {obs.obsID}</li>
          )}
        </ul>
      </div>
    )
  }

  // <div>
  //   { observations.map(x => `${x.comName} - ${x.howMany}`).join(', ') }
  // </div>

}

const mapStateToProps = (state, props) => {
  let filteredObservations = state
    .observations
    .filter(x => state.filters.re.test(x.comName))
    .filter(x => x.notable || !state.filters.notableOnly)
  let observations = filteredObservations
    .filter(x => x.locID === state.selections.locID)
  return {
    locID: state.selections.locID,
    observations: observations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checklist)

// export default Checklist
