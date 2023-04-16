import { useState, useEffect } from 'react'
import './App.scss'

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
  }

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>

        <h1> {currentTime}</h1>
        <p>{myResponse.condition.text}</p>
        <img src={myResponse.condition.icon} alt=" icono" />
        <h2>{myResponse.temp_c + '°'}</h2>
        <input type="button" value={'dark'} onClick={toggleTheme} />

   </div>
  )
}

export default App;
