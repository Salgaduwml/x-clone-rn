import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

// format a number to a shortest format (e.g. 1000 -> 1k, 10000 -> 10k)
export const formatNumber = (num: number) => {
  if (num >= 1000) return Math.floor(num / 1000) + "K";
  return num.toString();
};

// format a date to a relative time format (e.g. 1m, 2h, 3d)
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInDays(now, date);

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
};
