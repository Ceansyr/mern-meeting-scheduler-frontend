import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/PreferencesPage.css";

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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/preference`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save Username or Preference');
            }

            navigate('/username-preference');
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
                    <input
                        type="text"
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
                        <button
                            key={category.id}
                            type="button"
                            className={`page-preferences-option ${
                                formData.selectedCategory === category.name ? "active" : ""
                            }`}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <div className={ `category-icon category-icon-${category.id}`}></div>
                            {category.name}
                        </button>
                    ))}
                </div>

                <button
                    className="page-preferences-continue"
                    onClick={handleContinue}
                    disabled={!formData.username || !formData.selectedCategory}
                >
                    Continue
                </button>
                {error && <p className="error-message">{error}</p>}
            </div>

            <div className="page-preferences-image"></div>
        </div>
    );
};

export default UsernameAndPreference;