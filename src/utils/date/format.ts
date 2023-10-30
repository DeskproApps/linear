import isDate from "date-fns/isDate";
import { default as fnsFormat } from "date-fns/format";
import { DATE_FORMAT } from "../../constants";
import type { Maybe, DateTime } from "../../types";

const format = (date: Maybe<Date|DateTime>, pattern = DATE_FORMAT): string => {
  if (!date) {
    return "-";
  }

  if (isDate(date)) {
    return fnsFormat(date as Date, pattern);
  }

  return fnsFormat(new Date(date), pattern);
};

export { format };
