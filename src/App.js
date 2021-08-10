import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './componets/auth/Login';
import Signup from './componets/auth/Signup';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route />
      </Switch>
    </Router>
  );
}

export default App;
