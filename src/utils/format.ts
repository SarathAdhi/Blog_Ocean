export const formatTitle = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, "")
    .replaceAll(" ", "-");
};

export const formatDate = (date: string) => {
  const dateString = `${new Date(date)}`;

  return dateString.split(" ").slice(1, 4).join(" ");
};
