import React, { PropTypes } from 'react'
import { InfoWindow } from 'react-google-maps'
import { connect } from 'react-redux'

class Checklist extends React.Component {

  static propTypes = {
    store: React.PropTypes.object.isRequired,
    locID: React.PropTypes.string.isRequired,
    locName: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <h4>{this.props.locName} ({this.props.locID})</h4>
        <ul>
          {this.props.observations.map(obs =>
            <li key={ `${obs.obsID}/${obs.comName}` }>
              {obs.comName}: {obs.howMany} ({this.ebirdLink(obs.subID)})
            </li>
          )}
        </ul>
      </div>
    )
  }

  ebirdLink(subID) {
    let href = `http://ebird.org/ebird/view/checklist?subID=${subID}`
    return <a href={href} target='_blank' >{subID}</a>
  }

}

const mapStateToProps = (state, props) => {
  let observations = state
    .observations
    .filter(x => state.filters.re.test(x.comName))
    .filter(x => x.notable || !state.filters.notableOnly)
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
