import AuthProvider from "./Components/auth/AuthProvider";
import AppRouter from "./Routers/AppRouter";

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
