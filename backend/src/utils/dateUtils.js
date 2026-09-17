// backend/src/utils/dateUtils.js

const config = require('../config/config');
const { parseDate } = require('./bookingUtils');

function getLimaDateParts() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: config.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const values = {};

  for (const part of parts) {
    if (part.type !== 'literal') {
      values[part.type] = part.value;
    }
  }

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  };
}

function getTodayInLima() {
  const { year, month, day } = getLimaDateParts();

  return new Date(Date.UTC(year, month - 1, day));
}

function isDateWithinBookingRange(fecha) {
  const appointmentDate = parseDate(fecha);

  if (!appointmentDate) {
    return false;
  }

  const today = getTodayInLima();

  const maxDate = new Date(today);
  maxDate.setUTCDate(
    maxDate.getUTCDate() + config.booking.maxAdvanceDays
  );

  return appointmentDate >= today &&
         appointmentDate <= maxDate;
}

module.exports = {
  getTodayInLima,
  isDateWithinBookingRange,
};


