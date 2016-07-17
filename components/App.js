import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class App extends React.Component {
  static propTypes = {
    observations: React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired
    ).isRequired
  }
  render() {
    return (
      <div>
        <h2>Just getting started...</h2>
        <ul>
          {this.props.observations.map(observation =>
            <li key={observation}>{observation}</li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    observations: state.observations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
