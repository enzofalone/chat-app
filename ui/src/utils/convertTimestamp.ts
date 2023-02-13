
const isToday = (timestampDate: Date): boolean => {
  const today = new Date();
  return (
    timestampDate.getDate() == today.getDate() &&
    timestampDate.getMonth() == today.getMonth() &&
    timestampDate.getFullYear() == today.getFullYear()
  );
};

const isYesterday = (timestampDate: Date): boolean => {
  const yesterday = new Date(new Date().setHours(-1));

  return (
    timestampDate.getDate() == yesterday.getDate() &&
    timestampDate.getMonth() == yesterday.getMonth() &&
    timestampDate.getFullYear() == yesterday.getFullYear()
  );
};

// TODO: move this to a class

export const convertCompleteTimestamp = (timestamp: string): string => {
  const timestampDate = new Date(timestamp);

  const time = timestampDate.toLocaleTimeString([], { timeStyle: "short" });
  const date = timestampDate.toLocaleDateString();

  return `${date} ${time}`;
};

export const convertTimestamp = (timestamp: string): string => {
  const timestampDate = new Date(timestamp);

  const time = timestampDate.toLocaleTimeString([], { timeStyle: "short" });
  const date = timestampDate.toLocaleDateString();

  // discord-like format
  if (isToday(timestampDate)) {
    return time;
  }

  if (isYesterday(timestampDate)) {
    return `Yesterday at ${time}`;
  }

  return `${date} ${time}`;
};
