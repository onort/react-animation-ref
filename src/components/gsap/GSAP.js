// @flow

import React, { Component } from 'react';
import { TweenMax } from 'gsap'
import './GSAP.css'


class GSAP extends Component {

  state = {
    boxes: ['one', 'two', 'three', 'four']
  }

  componentDidMount() {
    TweenMax.staggerFrom('.box', 0.5, { opacity: 0, y: 200, delay: 0.25,}, 0.2)
  }

  resetBoxes() {
    TweenMax.to('.box, h3', 0.25, { opacity: 1, scale: 1, x: 0 })
  }

  staggeredRoll() {
    TweenMax.staggerFrom('.box', 1, { rotation: 360 }, 0.5)
  }

  vanishBoxes() {
    TweenMax.to('.box', 1, { scale: 0} )
  }

  leaveScene() {
    TweenMax.staggerTo('.box', 0.8, { x: 600, opacity: 0}, -0.1)
  }

  removeBox(e: SyntheticEvent) {
    TweenMax.to(e.target, 1, {scale: 0, opacity: 0})
  }

  render() {
    return (
      <div className="container gsap">
        <h3 className="title">GSAP Example</h3>
        <button className="btn" onClick={this.staggeredRoll}>Staggered Roll</button>
        <button className="btn" onClick={this.vanishBoxes}>Vanish</button>
        <button className="btn" onClick={this.leaveScene}>Leave Scene</button>
        <button className="btn" onClick={this.resetBoxes}>Reset Boxes</button>
        <div className="box-container">
          {this.state.boxes.map((box, i) => 
            <div key={i} className="box" onClick={this.removeBox}><h3 onClick={() => {}}>{box}</h3></div>
          )}
        </div>
      </div>
    );
  }
}

export default GSAP
