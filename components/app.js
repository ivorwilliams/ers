import React, { PropTypes } from 'react'
import Controls from './controls.js'
import Species from './species.js'
import Locations from './locations.js'
import '../css/base.css'

class App extends React.Component {
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

export default App
