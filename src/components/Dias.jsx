const Dias = ({text = ''}) => {
  if (text === 0) {
    return 'domingo';
  } else if (text === 1) {
    return 'lunes';
  } else if (text === 2) {
    return 'martes';
  } else if (text === 3) {
    return 'miércoles';
  } else if (text === 4) {
    return 'jueves';
  } else if (text === 5) {
    return 'viernes';
  } else if (text === 6) {
    return 'sábado';
  } else {
    return 'Valor inválido';
  }
  return (
    <>
          <p>{text} </p>

    </>
  );
};

export default Dias;
