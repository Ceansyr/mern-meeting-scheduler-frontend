import React from "react";
import PasswordStrengthIndicator from "../auth/PasswordStrengthIndicator";

function ProfileForm({ 
  formData, 
  passwordStrength, 
  onChange, 
  onSubmit, 
  error, 
  success 
}) {
  return (
    <form className="settings-form" onSubmit={onSubmit}>
      {error && <p className="settings-error">{error}</p>}
      {success && <p className="settings-success">{success}</p>}
      
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">New Password (leave blank to keep current)</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
        {formData.password && (
          <PasswordStrengthIndicator strength={passwordStrength} />
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChange}
        />
      </div>
      
      <button type="submit" className="settings-save-btn">
        Save Changes
      </button>
    </form>
  );
}

export default ProfileForm;