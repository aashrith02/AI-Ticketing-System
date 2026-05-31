import { Routes, Route } from "react-router-dom";

import Register from "./pages/before-Login/Register";
import Login from "./pages/before-Login/Login";
import Dashboard from "./pages/after-Login/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;