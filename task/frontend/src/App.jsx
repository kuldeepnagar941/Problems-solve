import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Showuser from "./components/Showuser";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
         
        <Route path="/showuser" element={<ProtectedRoute pro={<Showuser />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
