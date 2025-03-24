import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await response.json();
      localStorage.setItem('token', `${data.token}`);

      navigate('/username-preference');
    } catch (err) {
      setError(err.message || 'An error occurred'); 
    }
  };

  return (
    <div className="container">
      <div className="signup-container">
        <div className='logo'>
        </div>
        <div className="signup-form">
          <div className="signup-content">
            <div className='signup-title'>
              <h2>Create an Account</h2>
              <a href="./Login.jsx">sign in instead</a>
            </div>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="terms">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  By creating an account, I agree to the{' '}
                  <a href="/terms">Terms of Use</a> and{' '}
                  <a href="/privacy">Privacy Policy</a>.
                </label>
              </div>
              <button type="submit" className="signup-btn">
                Create an Account
              </button>
            </form>
          </div>
          <div className="warning">
            <p>This site is protected by reCAPTCHA and the <span style={{ textDecoration: 'underline' }}>Google Privacy Policy</span> and <span style={{ textDecoration: 'underline' }}>Terms of Service</span> apply</p>
          </div>
        </div>
      </div>
      <div className="signup-image">
        </div>
    </div>
  );
};

export default Signup;
