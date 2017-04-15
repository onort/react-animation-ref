// As seen @ https://medium.com/@nashvail/a-gentle-introduction-to-react-motion-dc50dd9f2459

import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import './ButtonMenu.css'

// Value of 1 degree in radians
const DEG_TO_RAD = 0.0174533
// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 90
const CHILD_BUTTON_DIAM = 50
// The number of child buttons that fly out from the main button
const NUM_CHILDREN = 3
// Hard coded position values of the mainButton
const M_X = 200
const M_Y = 300

// How far away from the main button does the child buttons go
const FLY_OUT_RADIUS = 120,
	SEPARATION_ANGLE = 40, //degrees
	FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE, //degrees
	BASE_ANGLE = ((180 - FAN_ANGLE)/2) // degrees

// Since JS Math. functions accept value of angle in radians and we've been working in degrees we will need to covert
// degrees to radians first.
function toRadians(degrees) {
	return degrees * DEG_TO_RAD
}


function finalDeltaPositions(index) {
	let angle = BASE_ANGLE + ( index * SEPARATION_ANGLE );
	return {
		deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(angle)) - (CHILD_BUTTON_DIAM/2),
		deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(angle)) + (CHILD_BUTTON_DIAM/2)
	};
}

const buttonIcons = ['cog', 'plus', 'user']

class ButtonMenu extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      menuOpen: false,
    }
    this.openMenu = this.openMenu.bind(this)
  }

  mainButtonStyles() {
		return {
			width: MAIN_BUTTON_DIAM,
			height: MAIN_BUTTON_DIAM,
			top: M_Y - (MAIN_BUTTON_DIAM/2),
			left: M_X - (MAIN_BUTTON_DIAM/2)
		}
	}

  initialChildButtonStyles() {
		return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
			top: spring(M_Y - (CHILD_BUTTON_DIAM/2)),
			left: spring(M_X - (CHILD_BUTTON_DIAM/2)),
		};
	}

  finalChildButtonStyles(childIndex) {
		let{deltaX, deltaY} = finalDeltaPositions(childIndex);
		return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
			left: spring(M_X + deltaX),
			top: spring(M_Y - deltaY),
		}
  }

  openMenu() {
		let{menuOpen} = this.state;
		this.setState({
			menuOpen: !menuOpen
		});
	}

  render() {
    let { menuOpen } = this.state
    return (
      <div>
        <h1 className="title">Button Menu</h1>
        <div>
          {buttonIcons.map((icon, index) => {
            let style = menuOpen ? this.finalChildButtonStyles(index) : this.initialChildButtonStyles()
            return (
              <Motion key={index} style={style}>
                {(interpolatingStyle) => 
                  <div
                    className="child-button"
                    style={{ width: interpolatingStyle.width, height: interpolatingStyle.height,
                            top: interpolatingStyle.top, left: interpolatingStyle.left }}
                  >
                  <i className={`fa fa-${buttonIcons[index]} fa-lg`}></i>
                </div>}
              </Motion>
            )
          })}
          <div className="main-button" onClick={this.openMenu} style={this.mainButtonStyles()}>
            <i className="fa fa-ellipsis-v fa-lg" />
          </div>
        </div>
      </div>
    );
  }
}

export default ButtonMenu
