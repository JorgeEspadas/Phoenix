import React from "react";
import AuthProvider from "./Components/auth/AuthProvider";
import AppRouter from "./Routers/AppRouter";
require('dotenv').config();

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