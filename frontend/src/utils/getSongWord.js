import i18next from "i18next";

export function getSongWord(count) {
  if (i18next.language === "uk") {
    if (count % 10 === 1 && count % 100 !== 11) {
      return `${count} пісня`;
    } else if (
      [2, 3, 4].includes(count % 10) &&
      ![12, 13, 14].includes(count % 100)
    ) {
      return `${count} пісні`;
    } else {
      return `${count} пісень`;
    }
  }
  return `${count} songs`;
}
