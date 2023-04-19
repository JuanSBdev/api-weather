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
  const [cityUrl, setCityUrl] = useState('Cordoba'); // estado para manejar el ciudad
  const [lugarDos, setLugarDos] = useState(''); // estado para manejar el ciudad

  let img_sol = 'https://cdn-icons-png.flaticon.com/512/6661/6661565.png'
  let lugar = cityUrl;
  let url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lugar}`
  let lugarListo = ''
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '51ba63a738mshc342e294c358014p14553bjsn60bec33c628c',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    

      fetch(url, options)
      .then(response => response.json())
      .then(response => setMyResponse(response),  
         console.log(myResponse))
      .catch(err => console.error(err));
      
      const intervalId = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
      }, 1000)
          
      return () => {
        clearInterval(intervalId)
      }
    }, [cityUrl]);
    //SET CIUDAD DESDE EL INPUT

    const inputUrl = (event) => {
      setCityUrl(event.target.value) 
    }
    // función para manejar el cambio de tema
    const toggleTheme = () => {
      setDarkMode(!darkMode);
      document.body.classList.toggle('dark');
    }
    //set placeholder
    const inP = ( )=>{
      setLugarDos(this.target.value)

    }
    
  return (
    <Container>
    <Row> 
    
    </Row>
  {myResponse && lugar && (
    <Container>
    <Row>
       <Buenas > </Buenas>
    </Row>
    <Row>
      <Col>
        <Dias text={ myResponse.current.is_day}></Dias>
        <h2>{currentTime}</h2>
      </Col>
    </Row>
    <Row>
      <Col >
        <h3>{myResponse.current.temp_c + "°"}</h3>
        <p>{myResponse.current.condition.text}</p>
      </Col>
      <Col>
      
        <img src={myResponse.current.condition.icon} onClick={toggleTheme} alt="icono" />
      </Col>
    </Row>
    <h1>
       <input id='lugar-inp' type="text" onChange={inP} placeholder={lugarDos} onKeyDown={event => {

         if (event.key === "Enter") {
           inputUrl(event);

          }
        }}  />
        </h1>
    <h3>   {myResponse.location.region} </h3>

    <Button className='asd' variant='secondary' onClick={toggleTheme}>
      <img src={img_sol} alt="" />
    </Button>
    <Footer className="footer"></Footer>
  </Container>
)}  

    
</Container>
  )
}

export default App;
