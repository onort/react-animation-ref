// @flow

import React from 'react';
import './App.css';
import { BrowserRouter, NavLink, Route } from 'react-router-dom'
import { Basic, ButtonMenu, Home } from './components'

const Links = () => (
  <nav className="navigation">
    <NavLink exact activeClassName="active" to="/">Home</NavLink>
    <NavLink activeClassName="active" to="/basic">Basic</NavLink>
    <NavLink activeClassName="active" to="/buttonMenu">Button Menus</NavLink>
  </nav>
)

const App = () => (
  <BrowserRouter>
    <div>
      <Links />
      <Route exact path="/" component={Home} />
      <Route path="/basic" component={Basic} />
      <Route path="/buttonMenu" component={ButtonMenu} />
    </div>
  </BrowserRouter>
)

export default App;
