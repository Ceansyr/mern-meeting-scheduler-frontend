import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Availability from "./pages/Availability";
import Settings from "./pages/Settings";
import PublicEvent from "./pages/PublicEvent";
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/event/:id" element={<PublicEvent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
