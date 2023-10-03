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
      .then(response => setMyResponse(response) ,

      )
      .catch(error => console.error('non bueno', error));
      
     
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


        
        // useEffect(()=>{
        //   console.log(myResponse)
        // },[myResponse])

        
  return (
    <Container className='containeres prin' ref={cardClima}>
    <Row className='primera'> 
      
      <Col xs={9}  className='ms-3 me-1' >
        <input  id='lugar-inp'  ref={inputLugar} type="text" onKeyDown={event => {
          if (event.key === "Enter") {
            inputUrl(event);
         }
        }} placeholder={ `Enter place...`} />

        <img src={img_lupa} className='img-lupa'  onClick={esto} alt="lupa"  />
    </Col>

      <Col xs={1} >
        <Button className='button-theme' variant='secondary' onClick={toggleTheme}>
          <img src={img_sol} alt="Toggle Theme" />
        </Button>
      </Col>
    </Row>
  {  myResponse && lugar && myResponse.location ? (
    <Container className='container_card'>
    <Row>
        <h2 className='h2_time' >{myResponse.location.localtime}hs.</h2>
    </Row>
    <Row>
      <Col>
            <h3> {myResponse.location.name},  {myResponse.location.region}, </h3>
      <h3>
             {myResponse.location.country} 
        </h3>
      </Col>
        <Dias text={ tday }/>
    </Row>
    <Row>
      <Row className='row_temp'>

      <Col className='col-temp' >
        <h3>{myResponse.current.temp_c + "°"}</h3>
      </Col>
      <Col>
        <Col>
          <p>{myResponse.current.condition.text}</p>
           <img src={myResponse.current.condition.icon} onClick={toggleTheme} alt="icono" />
        </Col>
       </Col>

     </Row>
      <Row>

    <Row>

      <Col xs={6} >
        <p>Rain</p>
        <p>{myResponse.current.precip_mm} mm</p>
        
      </Col>
      <Col>
      <Row  className='wind_row'>
      <p className='p_wind' >Wind</p>
        <Col>
        <p>{myResponse.current.wind_kph} </p>
        <p>kph </p>
        
        </Col>
        <Col>
          <p>direction</p>
          <p>{myResponse.current.wind_dir}</p>
        </Col>

      </Row>
      </Col>
      
    </Row>
      </Row>
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