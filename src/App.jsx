import { useState, useEffect, useRef } from 'react'

import './App.scss'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dias from './components/Dias';
import Buenas from './components/Buenas';
// import Location from './components/Location';
import { Footer } from './components/Footer';

function App() {
  const [myResponse, setMyResponse] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(false); // estado para manejar el modo oscuro
  const [cityUrl, setCityUrl] = useState('Cordoba'); // estado para manejar el ciudad
  let img_sol = 'https://cdn-icons-png.flaticon.com/512/6661/6661565.png'
  let img_lupa = 'https://icones.pro/wp-content/uploads/2021/06/icone-loupe-gris.png'
  let lugar = cityUrl;
  let url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lugar}`
  const cardClima = useRef(null);
  const inputLugar = useRef();
  const cambioHora = function(chooseImg){
      cardClima.current.style.backgroundImage = chooseImg;

  }
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
      .then(response => setMyResponse(response))
      .catch(error => console.error('non bueno', error));
      
      const intervalId = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
      }, 1000)
          
      return () => {
        clearInterval(intervalId) 
      }
    }, [cityUrl]);
        
        // función para manejar el cambio de tema
        const inputUrl = (event) => {
          setCityUrl(event.target.value) 
          event.target.value = '';
        }
        const toggleTheme = () => {
          setDarkMode(!darkMode);
          document.body.classList.toggle('dark');
        }
        const esto = () => {
          setCityUrl(inputLugar.current.value);
          inputLugar.current.value = ''
        }
        const da = new Date;
        const tday = da.getDay();
        
  return (
    <Container className='containeres' ref={cardClima}>
    <Row className='primera'> 
      
      <Col xs={9}  className='ms-3 me-1' >
        <input  id='lugar-inp'  ref={inputLugar} type="text" onKeyDown={event => {
          if (event.key === "Enter") {
            inputUrl(event);
         }
        }} placeholder={ `escribe un lugar...`} />

        <img src={img_lupa} className='img-lupa'  onClick={esto} alt="lupa"  />
    </Col>

      <Col xs={1} >
        <Button className='button-theme' variant='secondary' onClick={toggleTheme}>
          <img src={img_sol} alt="Toggle Theme" />
        </Button>
      </Col>
    </Row>
  {  myResponse && lugar && myResponse.location ? (
    <Container>
    <Row>
      <Col>
       <Buenas cambioHora={cambioHora} > </Buenas>
      </Col>
      <Col>
        <h2>{currentTime}</h2>
      </Col>
    </Row>
    <Row>
      <h3> {myResponse.location.name},  {myResponse.location.region} </h3>
    </Row>
    <Row>
      <Col className='col-temp' >
        <Dias text={ tday }></Dias>
        <h3>{myResponse.current.temp_c + "°"}</h3>
      </Col>
      <Col xs={6} >
        <p>{myResponse.current.condition.text}</p>
        <img src={myResponse.current.condition.icon} onClick={toggleTheme} alt="icono" />
      </Col>
    </Row>
   

    
    <Footer className="footer"></Footer>
  </Container>
    ) : (<Container>
    <Row>
      <Col>
        <h2>"Be mindful of your spelling"</h2>
      </Col>
    </Row>
    <Footer className="footer"></Footer>
  </Container>) } 


    
</Container>
  ) 
}

export default App;