import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Event.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCalendarDay, faClock, faGear } from "@fortawesome/free-solid-svg-icons";

function SettingsPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState('');

  const evaluatePasswordStrength = (password) => {
    let strength = '';
    const lengthCriteria = password.length >= 6;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (lengthCriteria && uppercaseCriteria && numberCriteria && specialCharCriteria) {
      strength = 'Strong';
    } else if (lengthCriteria && (uppercaseCriteria || numberCriteria || specialCharCriteria)) {
      strength = 'Medium';
    } else {
      strength = 'Weak';
    }
    setPasswordStrength(strength);
  };
  
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        setCurrentUser(user);
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          password: "",
          confirmPassword: "",
        });
      }
    };
  
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      evaluatePasswordStrength(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.firstName.trim()) {
      setError("First name is required.");
      return;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (passwordStrength === 'Weak') {
      setError('Password is too weak. Please choose a stronger password.');
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };
    if (formData.password) {
      payload.password = formData.password;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/update`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update settings");
      }
      setSuccess("Account updated successfully!");

      if (formData.email !== currentUser.email || formData.password) {
        localStorage.removeItem("user");
        alert("Email or password updated. Please log in again.");
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="page-events-container">
      <aside className="page-events-sidebar">
              <div className="page-events-logo"></div>
              <nav className="page-events-nav">
                <ul>
                  <li onClick={() => navigate("/events")}>
                    <FontAwesomeIcon icon={faLink} /> Events
                  </li>
                  <li onClick={() => navigate("/booking")}>
                    <FontAwesomeIcon icon={faCalendarDay} /> Booking
                  </li>
                  <li onClick={() => navigate("/availability")}>
                    <FontAwesomeIcon icon={faClock} /> Availability
                  </li>
                  <li className="active" onClick={() => navigate("/settings")}>
                    <FontAwesomeIcon icon={faGear} /> Settings
                  </li>
                </ul>
              </nav>
              <button
                className="page-events-create-btn"
                onClick={() => navigate("/create-event")}
              >
                + Create
              </button>
              <div className="page-events-user">
                <div className="user-avatar"></div>
                <p>{currentUser?.username || "Guest"}</p>
              </div>
            </aside>

      <main className="page-events-main">
        <header className="page-events-header">
          <h2>Settings</h2>
          <p>Update your account information below. Changes to email or password will require you to log in again.</p>
        </header>

        {error && <p className="settings-error">{error}</p>}
        {success && <p className="settings-success">{success}</p>}

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="settings-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="settings-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="settings-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="settings-group">
            <label htmlFor="password">Password (leave blank to keep current)</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="settings-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="settings-submit-btn">
            Update Settings
          </button>
        </form>
      </main>
    </div>
  );
}

export default SettingsPage; 
