// import React, { useEffect, useState } from 'react';

// const Location = () => {
//   const [city, setCity] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=TU_API_KEY`);
//         const data = await response.json();
//         if (data.status === "OK") {
//           const city = data.results[0].address_components.find(component => component.types.includes("locality"))?.long_name;
//           setCity(city);
//         }
//       });
//     }
//   }, []);

//   return (
//     <div>
//       {city ? (
//         <p>Tu ubicación actual es: {city}</p>
//       ) : (
//         <p>Buscando tu ubicación...</p>
//       )}
//     </div>
//   );
// };

// export default Location;
