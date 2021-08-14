import React from "react";
import Sidebar from "../Components/layout/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Components/auth/Login";
import HomePage from "../Pages/HomePage";
import AnaliticsPage from "../Pages/AnaliticsPage";
import InfoPage from "../Pages/InfoPage";
import ContactPage from "../Pages/ContactPage";
import FormPage from "../Pages/FormPage";
import AdminPage from "../Pages/AdminPage";
import NotFoundPage from "../Pages/NotFoundPage";

import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <div className="SidebarContenedor">
        <Sidebar />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/Estadisticas" component={AnaliticsPage} />
          <Route exact path="/Info" component={InfoPage} />
          <Route exact path="/Contactanos" component={ContactPage} />
          <Route exact path="/Login" component={Login} />

          <PrivateRoute exact path="/Encuestas" component={FormPage} />
          <PrivateRoute exact path="/Administrador" component={AdminPage} />

          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
