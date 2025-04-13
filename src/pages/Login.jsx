import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import FormInput from '../components/auth/FormInput';
import ErrorMessage from '../components/auth/ErrorMessage';
import { login, storeToken } from '../api/authApi';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const data = await login(formData);
      storeToken(data.token);
      navigate('/events');
    } catch (err) {
      setError(err.message || 'An error occurred'); 
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className='logo'>
        </div>
        <div className="login-form">
          <div className="login-content">
            <div className='login-title'>
              <h2>Sign in</h2>
            </div>
            <ErrorMessage message={error} />
            <form onSubmit={handleSubmit}>
              <FormInput
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required={true}
              />
              <FormInput
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required={true}
              />
              <button type="submit" className="login-btn">
                Log in
              </button>
            </form>
          </div>
          <div className="warning">
            <p>Don't have an account? </p> <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
      <div className="login-image">
      </div>
    </div>
  );
};

export default Login;
