export function formatDate(date: string | Date): string {
  if (!date) return "";

  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) return ""; // невалидная дата

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (dateObj.toDateString() === today.toDateString()) {
    return "Сегодня";
  }

  if (dateObj.toDateString() === yesterday.toDateString()) {
    return "Вчера";
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();

  return `${month} ${day}`;
}


export function formatDuration(value: string | number | undefined): string {
  if (!value) return "0 min";

  const minutes = typeof value === "string" ? parseInt(value, 10) : value;

  if (isNaN(minutes) || minutes <= 0) return "0 min";
  if (minutes === 1) return "1 min";

  return `${minutes} min`;
}

