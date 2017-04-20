// @flow

import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { TransitionMotion, spring } from 'react-motion'
import './EnterExit.css'

type Item = {
  key: string,
  data: {
    text: string,
  },
  style?: {
    x: number | Object,
    o: number | Object,
  }
}

class EnterExit extends Component {
  state: {
    entry: string,
    items: Array<Item>
  }
  textInput: any
  handleAdd: () => void
  handleRemove: () => void
  handleInputChange: () => void
  getStyles: () => Array<Object>

  constructor(props: any) {
    super(props)
    this.state = {
      entry: '',
      items: [
        {key: 't', data: {text: 'Remove this'}},
      ],
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.getStyles = this.getStyles.bind(this)
  }

  componentDidMount() {
    this.textInput.focus()
  }

  handleAdd(e: SyntheticEvent) {
    e.preventDefault()
    const { entry, items } = this.state
    if (entry.length) {
      const newItem = { data: {text: entry }, key: 't' + Date.now()}
      const updatedItems =  [...items, newItem]
      this.setState({ items: updatedItems, entry: '' })
    }
  }

  handleRemove(key: string) {
    const updatedItems = this.state.items.filter(item => item.key !== key)
    this.setState({ items: updatedItems })
  }

  handleInputChange(e: SyntheticInputEvent) {
    this.setState({ entry: e.target.value })
  }

  getStyles() {
    return this.state.items.map(item => ({...item, style: {x: spring(0), o: spring(1)}}))
  }

  willEnter() {
    return {
      o: 0,
      x: -100,
    }
  }

  willLeave() {    return {
      o: spring(0, {stiffness: 220, damping: 15}),
      x: spring(20, {stiffness: 220, damping: 15}),
    }
  }

  render() {
    const { entry, items } = this.state
    return (
      <div className="container enter-exit">
        <form onSubmit={this.handleAdd} className="form">
          <input
            ref={input => this.textInput = input}
            className="text-input"
            type="text"
            value={entry}
            onChange={this.handleInputChange}
          />
          <button className="btn submit-btn">Submit</button>
        </form>
        <div className="examples-container">
          <div className="items-container">
            <h3 className="title">CSSTransitionGroup</h3>
            <CSSTransitionGroup
              transitionName="items"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            >
              {items.map(item =>  <SingleItem onRemove={this.handleRemove} item={item} key={item.key} />)}
            </CSSTransitionGroup>
          </div>
          <div className="items-container">
            <TransitionMotion
              styles={this.getStyles()}
              willEnter={this.willEnter}
              willLeave={this.willLeave}
            >
                {styles => 
                  <div>
                    <h3 className="title">React-Motion</h3>
                    {styles.map((item, i) => 
                      <SingleItem rm onRemove={this.handleRemove} item={item} key={item.key} />
                    )}
                  </div>
                }
            </TransitionMotion>
          </div>
        </div>
      </div>
    );
  }
}

const SingleItem = ({ item, onRemove, rm}: {item: Item, onRemove: Function, rm?: boolean }) => {
  const styles = rm ? { opacity: item.style.o, transform: `translateX(${item.style.x}px)`} : {}
  return (
    <div className="item" style={styles}>
      <h3>{item.data.text}</h3>
      <i className="fa fa-times fa-lg" onClick={() => onRemove(item.key)} />
    </div>
  )
}

export default EnterExit
