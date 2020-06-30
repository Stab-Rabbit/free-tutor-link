import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login.js';
import User from './User.js';
import styles from '../styles.scss'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/home'>
          <User />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
