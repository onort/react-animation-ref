import React from 'react';
import './App.css';
import { BrowserRouter, NavLink, Route } from 'react-router-dom'
import Basic from './components/basic/Basic'
import ButtonMenu from './components/buttonMenu/ButtonMenu'

const Links = () => (
  <nav className="navigation">
    <NavLink exact activeClassName="active" to="/">Home</NavLink>
    <NavLink activeClassName="active" to="/basic">Basic</NavLink>
    <NavLink activeClassName="active" to="/buttonMenu">Button Menu</NavLink>
  </nav>
)

const App = () => (
  <BrowserRouter>
    <div>
      <Links />
      <Route exact path="/" render={() => <h1 className="title">This is home screen.</h1>} />
      <Route path="/basic" component={Basic} />
      <Route path="/buttonMenu" component={ButtonMenu} />
    </div>
  </BrowserRouter>
)

export default App;
