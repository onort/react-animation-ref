// @flow

import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import './EnterExit.css'

class EnterExit extends Component {
  state: {
    entry: string,
    items: Array<string>
  }
  handleAdd: () => void
  handleRemove: () => void
  handleInputChange: () => void

  constructor(props: any) {
    super(props)
    this.state = {
      entry: '',
      items: ['hello'],
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleAdd(e: SyntheticEvent) {
    e.preventDefault()
    const { entry, items } = this.state
    if (entry.length) {
      const newItems =  [...items, entry]
      this.setState({ items: newItems, entry: '' })
    }
  }

  handleRemove(index: number) {
    const updatedItems = [...this.state.items]
    updatedItems.splice(index, 1)
    this.setState({ items: updatedItems })
  }

  handleInputChange(e: SyntheticInputEvent) {
    this.setState({ entry: e.target.value })
  }

  render() {
    const { entry, items } = this.state
    return (
      <div className="container">
        <form onSubmit={this.handleAdd}>
          <input
            className="text-input"
            type="text"
            value={entry}
            onChange={this.handleInputChange}
          />
          <button className="btn submit-btn">Submit</button>
        </form>
        <div className="items-container">
          <CSSTransitionGroup
            transitionName="items"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          >
            {items.map((item, i) => <Item onRemove={this.handleRemove} item={item} key={i} i={i} />)}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

const Item = ({ i, item, onRemove }: { i: number, item: string, onRemove: Function }) => {
  return (
    <div className="item">
      <h3>{item}</h3>
      <i className="fa fa-times fa-lg" onClick={() => onRemove(i)} />
    </div>
  )
}

export default EnterExit