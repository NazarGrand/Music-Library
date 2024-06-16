import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/uk";

import i18next from "i18next";

dayjs.extend(localizedFormat);

export function formatDate(inputDate) {
  const dateObj = dayjs(inputDate).locale(i18next.language);
  const formattedDate = dateObj.format("LL");
  return formattedDate;
}
