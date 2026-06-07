import { Routes, Route } from "react-router-dom";

import Register from "./pages/before-Login/Register";
import Login from "./pages/before-Login/Login";
import Dashboard from "./pages/after-Login/Dashboard";
import Ticket from "./pages/after-Login/Ticket";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tickets/create-ticket" element={<Ticket />} />
      <Route path="/tickets/:id" element={<Ticket />} />

    </Routes>
  );
}

export default App;