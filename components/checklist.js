import React, { PropTypes } from 'react'
import { InfoWindow } from 'react-google-maps'
import { connect } from 'react-redux'

class Checklist extends React.Component {

  static propTypes = {
    store: React.PropTypes.object
  }

  render() {
    return (
      <div>Location {this.props.locID}</div>
    )
  }

  // <div>
  //   { observations.map(x => `${x.comName} - ${x.howMany}`).join(', ') }
  // </div>

}

const mapStateToProps = (state, props) => {
  return {
    locID: state.selections.locID
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
