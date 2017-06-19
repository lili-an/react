import React from 'react'
import AppBar from 'material-ui/AppBar'

class TopBar extends React.Component {
  render() {
    return <AppBar
      title="react"
      { ...this.props } />
  }
}

export default TopBar
