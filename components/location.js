import React, { PropTypes } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
import { connect } from 'react-redux'
import { selectLocation, deselectLocation } from '../actions/selections.js'
import Checklist from './checklist.js'

class Location extends React.Component {

  static propTypes = {
    locID: React.PropTypes.string.isRequired,
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
        zIndex={ this.props.selected ? 2 : 1 }
        >
        { this.props.selected ? this.renderInfoWindow() : null }
      </Marker>
    )
  }

  renderInfoWindow() {
    return (
      <InfoWindow
        onCloseclick={ () => this.props.onCloseClick() }
        >
        <Checklist {...this.props} store={this.context.store} />
      </InfoWindow>
    )
  }

}

const mapStateToProps = (state, props) => {
  return {
    selected: props.locID === state.selections.locID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (m) => {
      dispatch(selectLocation(m.props.locID))
    },
    onCloseClick: () => {
      dispatch(deselectLocation())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)
