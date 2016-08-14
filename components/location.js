import React, { PropTypes } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
import { connect } from 'react-redux'
import { selectLocation } from '../actions/selections.js'
import Checklist from './checklist.js'

class Location extends React.Component {

  static propTypes = {
    locID: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    position: React.PropTypes.shape({
      lat: React.PropTypes.number.isRequired,
      lng: React.PropTypes.number.isRequired
    }).isRequired,
    selectedLocID: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired
  }

  static contextTypes = {
    store: React.PropTypes.object
  }

  render() {
    return (
      <Marker
        { ...this.props }
        onClick={ () => this.props.onClick(this) }
        >
        { this.props.selected ? this.renderInfoWindow() : null }
      </Marker>
    )
  }

  renderInfoWindow() {
    return (
      <InfoWindow>
        <Checklist store={this.context.store} />
      </InfoWindow>
    )
  }

}

const mapStateToProps = (state, props) => {
  return {
    selected: props.locID == state.selections.locID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (m) => {
      dispatch(selectLocation(m.props.locID))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)
