import NavLayoutExample from "./examples/NavLayoutExample";
import { AuthContextProvider } from "./features/authentication/contexts/AuthContext";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";

function App() {
  return <div className="App">
    <AuthContextProvider>
    <NavLayoutExample/>
    </AuthContextProvider>
    </div>;
}

export default App;
