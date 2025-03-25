import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import UsernamePreference from "./pages/Username&Preference";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import "./styles/App.css";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/username-preference" element={<UsernamePreference />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
