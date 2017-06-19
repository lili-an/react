import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

class MenuDrawer extends React.Component {
  render() {
    return (
      <Drawer { ...this.props }>
        <MenuItem></MenuItem>
        <MenuItem></MenuItem>
      </Drawer>
    )
  }
}

export default MenuDrawer
