import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/PreferencesPage.css";
import FormInput from '../components/auth/FormInput';
import ErrorMessage from '../components/auth/ErrorMessage';
import CategoryButton from '../components/auth/CategoryButton';
import { saveUserPreference } from '../api/authApi';

const UsernameAndPreference = () => {
  const preferenceCategories = [
    { id: "sales", name: "Sales" },
    { id: "finance", name: "Finance" },
    { id: "consulting", name: "Consulting" },
    { id: "tech", name: "Tech" },
    { id: "education", name: "Education" },
    { id: "government", name: "Government & Politics" },
    { id: "recruiting", name: "Recruiting" },
    { id: "marketing", name: "Marketing" },
  ];

  const [formData, setFormData] = useState({
    username: "",
    selectedCategory: "",
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedCategory: category,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await saveUserPreference(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="page-preferences-container">
      <div className="page-preferences-form">
        <div className="page-preferences-logo">
          <div className="logo-icon"></div>
        </div>
        <h1 className="page-preferences-title">Your Preferences</h1>

        <div className="page-preferences-username">
          <FormInput
            id="username"
            name="username"
            placeholder="Tell us your username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <p className="page-preferences-subtitle">
          Select one category that best describes your CNNCT:
        </p>

        <div className="page-preferences-options">
          {preferenceCategories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={formData.selectedCategory === category.name}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>

        <button
          className="page-preferences-continue"
          onClick={handleContinue}
          disabled={!formData.username || !formData.selectedCategory}
        >
          Continue
        </button>
        <ErrorMessage message={error} />
      </div>

      <div className="page-preferences-image"></div>
    </div>
  );
};

export default UsernameAndPreference;