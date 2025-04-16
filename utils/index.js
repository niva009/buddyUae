export const parseDate = (fromDate) => {
  const originalDate = new Date(fromDate);
  const formattedDate = originalDate.toLocaleDateString();
  return `${formattedDate}`;
};
