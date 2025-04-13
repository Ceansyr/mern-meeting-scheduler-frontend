export const formatTimeRange = (startTime, duration) => {
  try {
    const time = startTime.split(" ");
    const [hours, minutes] = time[0].split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    const durationInMinutes = parseDuration(duration);
    const endDate = new Date(startDate.getTime() + durationInMinutes * 60000);

    const startFormatted = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const endFormatted = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${startFormatted} to ${endFormatted}`;
  } catch (err) {
    console.error("Error formatting time range:", err);
    return "Invalid time range";
  }
};

export const parseDuration = (duration) => {
  try {
    if (!duration) {
      return 60;
    }
    return parseInt(duration) * 60;
  } catch (err) {
    console.error("Error parsing duration:", err);
    return 0;
  }
};