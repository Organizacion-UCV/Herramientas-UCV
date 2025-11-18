function registrarUsuario(nombre, correo) {
  if (!nombre || !correo) {
    throw new Error("Los datos son obligatorios");
  }

  return {
    nombre,
    correo,
    registrado: true
  };
}

module.exports = { registrarUsuario };
