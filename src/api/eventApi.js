export async function getAllEvents() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
    return response.json();
  }
  
export async function createEvent(eventData) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    return response.json();
}

  