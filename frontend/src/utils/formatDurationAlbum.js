import moment from "moment";

export function formatDurationAlbum(seconds) {
  const duration = moment.duration(seconds, "seconds");

  let formattedTime = "";
  if (duration.hours() > 0) {
    formattedTime += `${duration.hours()}h `;
  }
  if (duration.minutes() > 0) {
    formattedTime += `${duration.minutes()}m `;
  }
  if (duration.seconds() > 0) {
    formattedTime += `${duration.seconds()}s`;
  }
  return formattedTime;
}
