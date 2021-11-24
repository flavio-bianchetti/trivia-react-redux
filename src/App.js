import React from 'react';
import { Switch, Route } from 'react-router';
// import logo from './trivia.png';
import Login from './pages/Login';
import Configurations from './pages/Configurations';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path="/configurations" component={ Configurations } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
