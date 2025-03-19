import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={() => { logout(); navigate('/login'); }}>Logout</button>
    </div>
  );
};

export default Profile;
