<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
=======
import AuthProvider from "./Components/auth/AuthProvider";
import AppRouter from "./Routers/AppRouter";
require('dotenv').config();
>>>>>>> development

function App() {
  return (
    <div>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
