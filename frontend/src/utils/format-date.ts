function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // UK format results in day-month-year
}

export default formatDate;
