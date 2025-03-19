import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Availability from "./pages/Availability";
import Settings from "./pages/Settings";
import PublicEvent from "./pages/PublicEvent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/event/:id" element={<PublicEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
