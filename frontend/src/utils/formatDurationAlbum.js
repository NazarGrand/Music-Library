import moment from "moment";
import i18next from "i18next";
import { LANGUAGES } from "../i18n/languages";

export function formatDurationAlbum(seconds) {
  const duration = moment.duration(seconds, "seconds");
  const h = i18next.language === LANGUAGES.UK ? "г" : "h";
  const m = i18next.language === LANGUAGES.UK ? "хв" : "m";
  const s = i18next.language === LANGUAGES.UK ? "c" : "s";

  let formattedTime = "";
  if (duration.hours() > 0) {
    formattedTime += `${duration.hours()}${h} `;
  }
  if (duration.minutes() > 0) {
    formattedTime += `${duration.minutes()}${m} `;
  }
  if (duration.seconds() > 0) {
    formattedTime += `${duration.seconds()}${s}`;
  }
  return formattedTime;
}
