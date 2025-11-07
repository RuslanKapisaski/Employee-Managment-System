export default function fromIsoDate(isoDate) {
  const date = new Date(isoDate);

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
}
