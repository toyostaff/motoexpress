function normalizePlate(plate) {
  if (typeof plate !== "string") {
    return "";
  }

  return plate

    .trim()

    .toUpperCase()

    .replace(/[\s-]/g, "");
}

function isValidPlate(plate) {
  const normalizedPlate = normalizePlate(plate);

  // Formato actual Perú:
  // ABC1234

  const formatoActual = /^[A-Z]{3}[0-9]{4}$/;

  // Formato antiguo:
  // AB1234

  const formatoAntiguo = /^[A-Z]{2}[0-9]{4}$/;

  return (
    formatoActual.test(normalizedPlate) || formatoAntiguo.test(normalizedPlate)
  );
}

module.exports = {
  normalizePlate,

  isValidPlate,
};
