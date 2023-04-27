export default function Buenas({ saludo = '' , cambioHora}) {
  const horaActual = new Date().getHours();
    let img_noche = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIvcJKK5w4ikVvYFRWGo-h91kEUsOIkGgbPg&usqp=CAU'

  let saludoPersonalizado = '';
  if (horaActual >= 6 && horaActual < 12) {
    saludoPersonalizado = '¡Buenos días!';
  } else if (horaActual >= 12 && horaActual < 19) {
    saludoPersonalizado = 'Buenas tardes';
  } else {
    saludoPersonalizado = 'Buenas noches.';
    cambioHora( 'url(' + img_noche +')');
  }

  return <h1>{saludo || saludoPersonalizado}</h1>;
}
