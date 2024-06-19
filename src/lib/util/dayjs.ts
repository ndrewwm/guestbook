import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isBetween from "dayjs/plugin/isBetween";
import localeData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', { weekStart: 1  });

export const djs = dayjs;
