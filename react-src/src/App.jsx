import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Create from './components/Create';
import Game from './components/Game/Game';

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={Create} />
      <Route path='/game' component={Game} />
    </Router>
  );
};

export default App;
