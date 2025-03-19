import axios from "axios";

export const fetchUser = async (setUser, logout) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/current`, {
      withCredentials: true,
    });
    if (res.data) {
      setUser(res.data);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    logout(); // Logout if user fetch fails
  }
};
