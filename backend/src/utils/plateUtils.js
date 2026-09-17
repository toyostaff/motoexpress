// backend/src/utils/plateUtils.js

function normalizePlate(plate) {
  if (typeof plate !== 'string') {
    return '';
  }

  return plate
    .trim()
    .toUpperCase()
    .replace(/[\s-]/g, '');
}

function isValidPlate(plate) {
  const normalizedPlate = normalizePlate(plate);

  return normalizedPlate.length >= 5 &&
         normalizedPlate.length <= 10 &&
         /^[A-Z0-9]+$/.test(normalizedPlate);
}

module.exports = {
  normalizePlate,
  isValidPlate,
};

