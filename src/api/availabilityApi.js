const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getAvailability(userId) {
  if (!userId) {
    throw new Error("User ID is undefined. Cannot fetch availability.");
  }
  
  const response = await fetch(`${API_URL}/availability/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  });
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Your session has expired. Please log in again.");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch availability");
  }
  return await response.json();
}

export async function saveAvailability(availabilityData) {
    const response = await fetch(`${API_URL}/availability`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
        credentials: "include",
        body: JSON.stringify(availabilityData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save availability");
    }

    return response.json();
}
