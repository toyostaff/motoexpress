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


  /*
    Regla MotoExpress:

    - Solo letras y números
    - Sin guiones
    - Sin espacios
    - Máximo 7 caracteres
  */

  const formatoUniversal = /^[A-Z0-9]{1,7}$/;


  return formatoUniversal.test(normalizedPlate);

}


module.exports = {
  normalizePlate,
  isValidPlate,
};