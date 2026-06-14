// Import router
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Import pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SearchMedicine from "./pages/SearchMedicine";
import EmergencySOS from "./pages/EmergencySOS";
import PharmacyDashboard from "./pages/PharmacyDashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/search"
          element={<SearchMedicine />}
        />

        <Route
          path="/sos"
          element={<EmergencySOS />}
        />

        <Route
          path="/pharmacy"
          element={<PharmacyDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;