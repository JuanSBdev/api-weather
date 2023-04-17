import { useState, useEffect } from 'react'

import './App.scss'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dias from './components/Dias';
import Buenas from './components/Buenas';
import { Footer } from './components/Footer';

function App() {
  const [myResponse, setMyResponse] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(false); // estado para manejar el modo oscuro
  
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '51ba63a738mshc342e294c358014p14553bjsn60bec33c628c',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13&lang=es', options)
      .then(response => response.json())
      .then(response => {
        setMyResponse(response.current)
        console.log(myResponse)
        console.log(currentTime)
      })
      .catch(err => console.error(err));

    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, []);

  // función para manejar el cambio de tema
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  }

  return (
    <Container>
{myResponse && (
  <Container>
    <Row>
      <Buenas> </Buenas>
    </Row>
    <Row>
      <Col>
        <Dias text={myResponse.is_day}></Dias>
        <h2>{currentTime}</h2>
      </Col>
    </Row>
    <Row>
      <Col >
        <h3>{myResponse.temp_c + "°"}</h3>
        <p>{myResponse.condition.text}</p>
      </Col>
      <Col>
        <img src={myResponse.condition.icon} onClick={toggleTheme} alt="icono" />
      </Col>
    </Row>
    <Footer className="footer"></Footer>
  </Container>
)}

    
</Container>
  )
}

export default App;
