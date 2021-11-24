import React from 'react';
import { Switch, Route } from 'react-router';
// import logo from './trivia.png';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } />
    </Switch>
  );
}
