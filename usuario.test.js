const { registrarUsuario } = require('./usuario');

test('Debe registrar un usuario correctamente', () => {
  const resultado = registrarUsuario("Juan", "juan@example.com");

  expect(resultado.nombre).toBe("Juan");
  expect(resultado.correo).toBe("juan@example.com");
  expect(resultado.registrado).toBe(true);
});

test('Debe lanzar error si faltan datos', () => {
  expect(() => registrarUsuario("", "")).toThrow("Los datos son obligatorios");
});
