import { DateTime } from 'luxon';

export const isISODateString = (value:string) => {
  return (
    !DateTime.fromISO(value).invalid
      ? undefined
      : [{ id: 'system.validation.error.mustBeDateString' }]
  );
};
