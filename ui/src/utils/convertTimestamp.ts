const isToday = (someDate: Date): boolean => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export const convertTimestamp = (timestamp: string): string => {
  const today = new Date();

  //TODO: check if yesterday and return so

  if (isToday(new Date(timestamp))) {
    return new Date(timestamp).toLocaleTimeString();
  } else {
    return `${new Date(timestamp).toLocaleDateString()}`;
  }
};
