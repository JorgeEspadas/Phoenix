import React from "react";
import AuthProvider from "./Components/auth/AuthProvider";
import AppRouter from "./Routers/AppRouter";
import SnackbarProvider from 'react-simple-snackbar';

function App() {
  return (
    <div>
      <AuthProvider>
        <SnackbarProvider>
          <AppRouter />
        </SnackbarProvider>
      </AuthProvider>
    </div>
  );
}

export default App;