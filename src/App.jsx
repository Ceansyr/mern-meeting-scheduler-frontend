import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import UsernamePreference from "./pages/Username&Preference";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/username-preference" element={<UsernamePreference />} />
        </Routes>
      </Router>
  );
}

export default App;
