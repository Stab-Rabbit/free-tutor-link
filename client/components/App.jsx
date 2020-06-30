import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login.js';
import Main from './mainPage/Main.js';
import EventPage from './Event';
import TutorPage from './Tutor';
import Header from './Header';
import styles from '../styles.scss';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // should be incorporated with some kind of auth
  return (
    <div>
      {isLoggedIn && <Header />}
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/home'>
          <Main setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path='/events/:id'>
          <EventPage />
        </Route>
        <Route path='/tutor/:id'>
          <TutorPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
