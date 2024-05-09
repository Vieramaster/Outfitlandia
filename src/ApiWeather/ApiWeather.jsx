import { useEffect, useState } from "react";

export default function ApiWeather({ city, setDataWeather }) {
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [errorWeather, setErrorWeather] = useState(null);
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
  });
  let url;
  const key = "c2638b4d5ddc5ca90b2455a289f7a142";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert("el navegador no soporta geolocalización");
    }
  }, []);

  if (position.latitude && position.longitude) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${key}&lang=es&units=metric`;
  }else null

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=es&units=metric`;
  }else  null

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then(setDataWeather)
        .catch(setErrorWeather)
        .finally(() => setLoadingWeather(false));
    }
  }, [url]);
console.log(errorWeather)

}
