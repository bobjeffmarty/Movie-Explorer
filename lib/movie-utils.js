export function truncateText(text, maxLength = 140) {
  if (!text) return "No description available.";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export function formatRuntime(runtimeMinutes) {
  if (!runtimeMinutes) return "Runtime not available";

  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;

  if (!hours) return `Runtime: ${minutes} min`;
  return `Runtime: ${hours}h ${minutes}m`;
}