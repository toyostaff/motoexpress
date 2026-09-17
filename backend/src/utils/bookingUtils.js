// backend/src/utils/bookingUtils.js

const config = require('../config/config');

function parseDate(fecha) {
  if (typeof fecha !== 'string') {
    return null;
  }

  const match = fecha.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

function getWeekDay(fecha) {
  const date = parseDate(fecha);

  if (!date) {
    return null;
  }

  return date.getUTCDay();
}

function isEnabledWeekDay(fecha) {
  const weekDay = getWeekDay(fecha);

  return config.booking.enabledWeekDays.includes(weekDay);
}

function getTurnByBlock(bloqueHora) {
  if (config.booking.morningBlocks.includes(bloqueHora)) {
    return 'Mañana';
  }

  if (config.booking.afternoonBlocks.includes(bloqueHora)) {
    return 'Tarde';
  }

  return null;
}

function isValidBlock(bloqueHora) {
  return getTurnByBlock(bloqueHora) !== null;
}

module.exports = {
  parseDate,
  getWeekDay,
  isEnabledWeekDay,
  getTurnByBlock,
  isValidBlock,
};