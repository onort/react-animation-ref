// @flow

import React, { Component } from 'react'
import Circular from './examples/Circular'
import Linear from './examples/Linear'
import './ButtonMenu.css'

class ButtonMenu extends Component {

  render() {
    return (
      <div className="container">
        <h1 className="title">Button Menus</h1>
        <Circular />
        <Linear />
      </div>
    );
  }
}

export default ButtonMenu
