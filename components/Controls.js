import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import uniq from 'lodash/uniq'

class Controls extends React.Component {
  static propTypes = {
  }
  render() {
    return (
      <div className="controls">
        <h4>No controls yet</h4>
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
)(Controls)
