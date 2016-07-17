import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import uniq from 'lodash/uniq'

class Locations extends React.Component {
  static propTypes = {
    locIDs: React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired
    ).isRequired
  }
  render() {
    return (
      <div className="locations">
        <h2>{this.props.locIDs.length} locations</h2>
        <ul>
          {this.props.locIDs.map(locID =>
            <li key={locID}>{locID}</li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    locIDs: uniq(state.observations.map(x => x.locID))
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
