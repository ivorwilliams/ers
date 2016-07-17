import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class App extends React.Component {
  static propTypes = {
    locations: React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired
    ).isRequired
  }
  render() {
    return (
      <div>
        <h2>Just getting started...</h2>
        <ul>
          {this.props.locations.map(location =>
            <li key={location}>{location}</li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locationsReducer.locations
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
