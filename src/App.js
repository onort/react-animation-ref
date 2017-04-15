import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Basic from './components/basic/Basic'
import ButtonMenu from './components/buttonMenu/ButtonMenu'

const Links = () => (
  <nav className="navigation">
    <Link to="/">Home</Link>
    <Link to="/basic">Basic</Link>
    <Link to="/buttonMenu">Button Menu</Link>
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
