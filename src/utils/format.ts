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

export const formatContentDescription = (description: string) => {
  return description?.split("<img ")[0].slice(0, 500);
};

export const formatSeoDescription = (description: string) => {
  const formatDescription = formatContentDescription(description);
  return formatDescription
    .replaceAll(/<[^>]*>?/gm, "")
    .replaceAll("&nbsp;", "");
};
