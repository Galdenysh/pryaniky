import moment from "moment-timezone";

export function convertDate(date: string | null | undefined) {
  if (!date) return date;
  const newDate = moment(date).tz('Europe/Moscow').format('DD.MM.YYYY');
  return newDate;
}
