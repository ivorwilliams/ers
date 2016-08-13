import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Controls from './controls.js'
import Species from './species.js'
import Locations from './locations.js'
import '../css/base.css'

class App extends React.Component {
  static propTypes = {
  }
  render() {
    return (
      <div className="app">
        <Controls />
        <Species />
        <Locations />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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
