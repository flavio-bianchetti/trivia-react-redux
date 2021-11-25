import React from 'react';
import { Switch, Route } from 'react-router';
// import logo from './trivia.png';
import Login from './pages/Login';
import Configurations from './pages/Configurations';
import GameScreen from './pages/GameScreen';
import './App.css';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route path="/configurations" component={ Configurations } />
      <Route path="/gamescreen" component={ GameScreen } />
      <Route path="/ranking" component={ Ranking } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
