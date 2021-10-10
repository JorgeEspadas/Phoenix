import React from "react";
import Sidebar from "../Components/layout/Sidebar.js";
import "../css/AppSidebar.css";
import "../css/LayoutConfiguration.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import HomePage from "../Pages/HomePage";
import AnaliticsPage from "../Pages/AnaliticsPage";
import ContactPage from "../Pages/ContactPage";
import FormPage from "../Pages/FormPage";
import AdminPage from "../Pages/AdminPage";
import NotFoundPage from "../Pages/NotFoundPage";
import Login from "../Pages/Login.js";


export default function AppRouter() {
  return (
    <Router>
      <div className="container-fluid overflow-hidden">
        <div className="row vh-100 overflow-auto">
          <Sidebar />
          <div className="col d-flex flex-column h-sm-100">
            <main className="row overflow-auto">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/Estadisticas" component={AnaliticsPage} />
                <Route exact path="/Contactanos" component={ContactPage} />
                <Route exact path="/Login" component={Login}/>

                <PublicRoute exact path="/Singin">
                  <Redirect to="/" />
                </PublicRoute>

                <PrivateRoute exact path="/Encuestas" component={FormPage} />
                <PrivateRoute
                  exact
                  path="/Administrador"
                  component={AdminPage}
                />

                <Route exact path="*" component={NotFoundPage} />
              </Switch>
            </main>
            <footer className=" footer row py-4 mt-auto">
              <div className="col"> JAM | 2021 </div>
            </footer>
          </div>
        </div>
      </div>
    </Router>
  );
}
