import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import UsernamePreference from "./pages/Username&Preference";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";
import Booking from "./pages/Booking";
import Availability from "./pages/Availability";
import SettingsPage from "./pages/Settings";
import "./styles/App.css";
import EventsPage from "./pages/Events";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/username-preference" element={<UsernamePreference />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/availability" element={<Availability />}/>
          <Route path="/settings" element={<SettingsPage />}/>
        </Routes>
      </Router>
  );
}

export default App;
