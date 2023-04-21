import { useState, useEffect, useRef } from 'react'

import './App.scss'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dias from './components/Dias';
import Buenas from './components/Buenas';
import { Footer } from './components/Footer';
function App() {
  const [h3ClassName, setH3ClassName] = useState(" ");
  const [myResponse, setMyResponse] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(false); // estado para manejar el modo oscuro
  const [cityUrl, setCityUrl] = useState('Cordoba'); // estado para manejar el ciudad
  const h3Ref = useRef(null);
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
    const handleH3Click = ()=> {
      event.target.style.display = "none";
      h3Ref.current.style.display = "flex";
      
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
        <h2>{currentTime}</h2>
        <Dias text={ myResponse.current.is_day}></Dias>
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
    <Row>

      <h3 className='input-h3' >
        <input ref={h3Ref} id='lugar-inp' type="text" placeholder={ `${myResponse.location.name}, ${myResponse.location.region}` } onKeyDown={event => {
          
          if (event.key === "Enter") {
            inputUrl(event);
            event.target.style.display = "none";

          }
        }}  />
      </h3>

      <h3 className='h3-listo' onClick={handleH3Click}>  {myResponse.location.name}, {myResponse.location.region} </h3>
        </Row>

  </Container>
)}  

    <Button className='asd' variant='secondary' onClick={toggleTheme}>
      <img src={img_sol} alt="" />
    </Button>
    <Footer className="footer"></Footer>
    
</Container>
  )
}

export default App;
