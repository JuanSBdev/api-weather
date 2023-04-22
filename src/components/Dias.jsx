const Dias = ({text = ''}) => {
  if (text === 0) {
    return 'Sunday';
  } else if (text === 1) {
    return 'Monday';
  } else if (text === 2) {
    return 'Tuesday';
  } else if (text === 3) {
    return 'Wednesday';
  } else if (text === 4) {
    return 'Thursday';
  } else if (text === 5) {
    return 'Friday';
  } else if (text === 6) {
    return 'Saturday';
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
