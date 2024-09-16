export const plural = (forms: Array<string>, n: number) => {
  let idx;
  // @see http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html
  if (n % 10 === 1 && n % 100 !== 11) {
    idx = 0; // many
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    idx = 1; // few
  } else {
    idx = 2; // one
  }
  return forms[idx] || '';
};


export const calculateDayDifferenceBetweenDates = (_dateStart: string, _dateEnd: string) => {
  const dateStart: Date = new Date(_dateStart);
  const dateEnd: Date = new Date(_dateEnd);

  if (dateEnd >= dateStart) {
    const diffInTime: number = dateEnd.getTime() - dateStart.getTime();
    return diffInTime / (1000 * 60 * 60 * 24);
  } else {
    return null;
  }
}