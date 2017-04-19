// @flow

import React from 'react';
import './App.css';
import { BrowserRouter, NavLink, Route } from 'react-router-dom'
import { Basic, ButtonMenu, EnterExit, Home } from './components'

const Links = () => (
  <nav className="navigation">
    <NavLink exact activeClassName="active" to="/">Home</NavLink>
    <NavLink activeClassName="active" to="/basic">Basic</NavLink>
    <NavLink activeClassName="active" to="/button-menu">Button Menus</NavLink>
    <NavLink activeClassName="active" to="/enter-exit">Enter Exit</NavLink>
    {/*<NavLink activeClassName="active" to="/exp">Exp</NavLink>*/}
  </nav>
)

const App = () => (
  <BrowserRouter>
    <div>
      <Links />
      <Route exact path="/" component={Home} />
      <Route path="/basic" component={Basic} />
      <Route path="/button-menu" component={ButtonMenu} />
      <Route path="/enter-exit" component={EnterExit} />
      {/*<Route path="/exp" component={Exp} />*/}
    </div>
  </BrowserRouter>
)

export default App;
