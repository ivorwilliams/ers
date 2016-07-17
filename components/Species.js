import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import uniq from 'lodash/uniq'

class Species extends React.Component {
  static propTypes = {
    birdNames: React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired
    ).isRequired
  }
  render() {
    return (
      <div className="species">
        <h2>{this.props.birdNames.length} bird species were seen</h2>
        <ul>
          {this.props.birdNames.map(birdName =>
            <li key={birdName}>{birdName}</li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    birdNames: uniq(state.observations.map(x => x.comName))
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
