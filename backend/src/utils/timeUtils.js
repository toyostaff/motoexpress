// backend/src/utils/timeUtils.js

const config = require('../config/config');
const { getTodayInLima } = require('./dateUtils');
const { getTurnByBlock } = require('./bookingUtils');

function getLimaTimeParts() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: config.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());

  const values = {};

  for (const part of parts) {
    if (part.type !== 'literal') {
      values[part.type] = Number(part.value);
    }
  }

  return {
    hour: values.hour,
    minute: values.minute,
  };
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function getBlockStartMinutes(bloqueHora) {
  if (!getTurnByBlock(bloqueHora)) {
    return null;
  }

  const match = bloqueHora.match(/^(\d{2}):(\d{2})\s-\s/);

  if (!match) {
    return null;
  }

  return Number(match[1]) * 60 + Number(match[2]);
}

function isFutureBlockForToday(fecha, bloqueHora) {
  const blockMinutes = getBlockStartMinutes(bloqueHora);

  if (blockMinutes === null) {
    return false;
  }

  const today = formatDate(getTodayInLima());

  if (fecha !== today) {
    return true;
  }

  const { hour, minute } = getLimaTimeParts();
  const currentMinutes = hour * 60 + minute;

  return blockMinutes > currentMinutes;
}

module.exports = {
  getLimaTimeParts,
  getBlockStartMinutes,
  isFutureBlockForToday,
};

