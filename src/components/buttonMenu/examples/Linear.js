// @flow

import React, { Component } from 'react';
import { Motion, spring } from 'react-motion'
import '../ButtonMenu.css'

const MAIN_BUTTON_DIAM = 75
const CHILD_BUTTON_DIAM = 50
const buttonIcons = ['cog', 'plus', 'user']
const M_X = 400
const M_Y = 300
const DISTANCE_BETWEEN = 70

function finalDeltaPosition(index) { 
  return DISTANCE_BETWEEN * (index + 1) + (CHILD_BUTTON_DIAM / 2)
}


class Linear extends Component {

  state: {
    menuOpen: boolean
  }
  toggleMenu: () => void

  constructor(props: any) {
    super(props)
    this.state = { menuOpen: false }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  mainButtonStyles() {
    return {
			width: MAIN_BUTTON_DIAM,
			height: MAIN_BUTTON_DIAM,
			top: M_Y - (MAIN_BUTTON_DIAM/2),
			left: M_X - (MAIN_BUTTON_DIAM/2)
		}
  }

  initialChildStyles() {
    return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
			top: spring(M_Y - (CHILD_BUTTON_DIAM/2)),
			left: M_X - (CHILD_BUTTON_DIAM/2),
		}
  }

  finalChildButtonStyles(childIndex: number) {
		return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
			top: spring(M_Y - finalDeltaPosition(childIndex)),
			left: M_X - (CHILD_BUTTON_DIAM/2),
		}
  }

  render() {
    let { menuOpen } = this.state
    return (
      <div>
        {buttonIcons.map((icon, index) => {
          let style = menuOpen ? this.finalChildButtonStyles(index) : this.initialChildStyles()
          return (
            <Motion key={index} style={style}>
              {({ width, height, top, left }) => 
                <div
                  className="child-button"
                  style={{ width, height, top, left }}
                >
                  <i className={`fa fa-${buttonIcons[index]} fa-lg`}></i>
                </div>
              }
            </Motion>
          )
        })}
        <div className="main-button" onClick={this.toggleMenu} style={this.mainButtonStyles()}>
          <i className="fa fa-ellipsis-v fa-lg" />
        </div>
      </div>
    );
  }
}

export default Linear;