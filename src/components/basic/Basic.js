// @flow

import React, { Component } from 'react';
import { Motion, spring } from 'react-motion'
import './Basic.css'


class Basic extends Component {
  state: {
    open: boolean,
  }
  toggle: () => void
  
  constructor(props: any) {
    super(props)
    console.log(this.props);
    this.state = { open: false }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <div className="container">
        <button className="toggle-button" onClick={this.toggle}>Toggle</button>
        <Motion style={{x: spring(this.state.open ? 0: 200)}}>
          {interpolatingStyle =>{ 
            return <div className="box" style={{ marginTop: interpolatingStyle.x }} />
          }}
        </Motion>
      </div>
    );
  }
}

export default Basic;
