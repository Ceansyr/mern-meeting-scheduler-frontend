import React, { useState, useEffect } from "react";
import "../styles/Event.css";
import Sidebar from "../components/Sidebar";
import ProfileForm from "../components/settings/ProfileForm";
// Import only once from authUtils
import { useCurrentUser, evaluatePasswordStrength } from "../utils/authUtils";
import { updateUserProfile } from "../api/userApi";

function SettingsPage() {
  const { currentUser, loading, setCurrentUser } = useCurrentUser();
  const [passwordStrength, setPasswordStrength] = useState('');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!loading && currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [currentUser, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      setPasswordStrength(evaluatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
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
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password && passwordStrength === 'Weak') {
      setError('Password is too weak. Please choose a stronger password.');
      return;
    }

    // Prepare payload
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    if (formData.password) {
      payload.password = formData.password;
    }

    try {
      const updatedUser = await updateUserProfile(payload);
      setCurrentUser(updatedUser);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to update profile");
    }
  };

  return (
    <div className="page-events-container">
      <Sidebar activePage="settings" currentUser={currentUser} />
      
      <main className="page-events-main">
        <header className="page-events-header">
          <h2>Account Settings</h2>
          <p>Manage your profile and account preferences.</p>
        </header>
        
        <ProfileForm
          formData={formData}
          passwordStrength={passwordStrength}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
          success={success}
        />
      </main>
    </div>
  );
}

export default SettingsPage;
