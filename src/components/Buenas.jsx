import React from 'react';

export default function Buenas({ saludo = '' }) {
  const horaActual = new Date().getHours();

  let saludoPersonalizado = '';
  if (horaActual >= 6 && horaActual < 12) {
    saludoPersonalizado = '¡Buenos días!';
  } else if (horaActual >= 12 && horaActual < 19) {
    saludoPersonalizado = 'Buenas tardes';
  } else {
    saludoPersonalizado = 'Buenas noches.';
  }

  return <h1>{saludo || saludoPersonalizado}</h1>;
}
