const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getAvailability(userId) {
  const response = await fetch(`${API_URL}/availability/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include", // ensure cookies are sent if required
  });
  if (!response.ok) {
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
        credentials: "include", // ensure cookies are sent if required
        body: JSON.stringify(availabilityData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save availability");
    }

    return response.json();
}
