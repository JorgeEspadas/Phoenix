import React from "react";
import Sidebar from "../Components/layout/Sidebar";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import HomePage from "../Pages/HomePage";
import AnaliticsPage from "../Pages/AnaliticsPage";
import InfoPage from "../Pages/InfoPage";
import ContactPage from "../Pages/ContactPage";
import FormPage from "../Pages/FormPage";
import AdminPage from "../Pages/AdminPage";
import NotFoundPage from "../Pages/NotFoundPage";

export default function AppRouter() {
  return (
    <Router>
      <div className="SidebarContenedor">
        <Sidebar />
        <div className="container-fluid">
          <nav
            className="navbar navbar-light"
            style={{ background: "#e3f2fd" }}
          >
            <div className="container-fluid justify-content-end">
              <a class="navbar-brand" href="#">
                Aqui debe ir algo Bonito
              </a>
            </div>
          </nav>

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/Estadisticas" component={AnaliticsPage} />
            <Route exact path="/Info" component={InfoPage} />
            <Route exact path="/Contactanos" component={ContactPage} />

            <PublicRoute exact path="/Singin">
              <Redirect to="/Login" />
            </PublicRoute>
            <PublicRoute exact path="/Login" component={Login} />
            <PublicRoute exact path="/Signup" component={Signup} />

            <PrivateRoute exact path="/Encuestas" component={FormPage} />
            <PrivateRoute exact path="/Administrador" component={AdminPage} />

            <Route exact path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
