import { Routes, Route } from "react-router-dom";

import Register from "./pages/before-Login/Register";
import Login from "./pages/before-Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;