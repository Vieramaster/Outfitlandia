import "./HomePage.css";
import SelectionGarment from "../SelectionGarment/SelectionGarment";
import SelectionClothes from "../SelectionClothes/SelectionClothes";
import Weather from "../Weather/Weather";
import { useState, useEffect, useRef } from "react";
import useDataJson from "../../CustomHooks/useDataJson";
import {
  filteredObjects,
  OutfitCreator,
  defaultGarmentButtons,
} from "../../CustomHooks/OutfitCreator";
import WeatherModal from "../WeatherModal/WeatherModal";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const [infoGarment, setInfoGarment] = useState(defaultGarmentButtons);
  const [idGarment, setIdGarment] = useState("");
  const [showGarments, setShowGarments] = useState([]);
  const [showClothes, setShowClothes] = useState({});
  const [garmentColor, setGarmentColor] = useState("");
  const [showColors, setShowColors] = useState({});
  const [divSwap, setDivSwap] = useState(false);
  const [firstButton, setFirstButton] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [addColorButtonCombine, setAddColorButtonCombine] = useState(false);
  const { dataJson, colorJson } = useDataJson();
  const [mobile, setMobile] = useState(window.innerWidth <= 800);
  const [showMobileClothes, setShowMobileClothes] = useState(true);
  const [dataWeather, setDataWeather] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const findGarments = (data, garment, search) => {
    return data.filter((item) => item[search] === garment);
  };

  // Ingresa el ID para identificar la parte específica de la prenda que debemos buscar. Luego, reiniciamos todos los useState para evitar posibles errores, y finalmente almacenamos la prenda en un estado (useState).
  const onClickGarment = (id) => {
    setDivSwap(false);
    setShowClothes({});
    setShowColors({});
    setIdGarment(id);
    setInfoGarment(defaultGarmentButtons);
    setAddColorButtonCombine(false);
    setFirstButton({});
    const newGarmet = findGarments(dataJson, id, "garment");
    setShowGarments(newGarmet);
    setShowMobileClothes(false);
  };

  //Ingresas el ID, que corresponde al nombre de la prenda seleccionada. Luego, buscamos los colores asociados a esa prenda y los almacenamos en un estado (useState). Además, creamos un estado booleano para alternar entre mostrar las prendas o los colores en la misma sección.
  const OnClickClothes = (id) => {
    const chosenGarment = findGarments(dataJson, id, "name");
    setShowClothes(chosenGarment);
    const [{ colors }] = chosenGarment;
    setShowColors(colors);
    setDivSwap(true);
  };

  // El ID proporciona el nombre del color, lo que nos permite buscar su imagen correspondiente y mostrarla en los botones principales. Así se logra la asociación visual entre los colores y las prendas.
  const onClickColor = (id) => {
    setGarmentColor(id);
    const imageButton = showColors.find((item) => item.colorName === id);

    const filterForButton = filteredObjects(showClothes, imageButton.colorName);

    setFirstButton(filterForButton[0]);

    const newImageButton = () => {
      const newGarmet = JSON.parse(JSON.stringify(infoGarment));

      const foundItem = newGarmet.find((item) => item.garment === idGarment);
      foundItem ? (foundItem.src = filterForButton[0].image) : null;
      return newGarmet;
    };

    setInfoGarment(newImageButton());
    setAddColorButtonCombine(true);
    setShowMobileClothes(true);
  };

  const onClickCombine = () => {
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 500);

    setInfoGarment(
      OutfitCreator(
        infoGarment,
        idGarment,
        showClothes,
        garmentColor,
        firstButton,
        dataJson,
        colorJson
      )
    );
  };

  const refModal = useRef(null);

  const toggleModalWeather = () => {
    if (!refModal.current) {
      return;
    }
    refModal.current.hasAttribute("open")
      ? refModal.current.close()
      : refModal.current.showModal();
  };

  const HandleModal = (event) => {
    event.preventDefault();
    setCity(event.target.searchCity.value);
  };

  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
  });

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

  let url;

  if (position.latitude && position.longitude) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${key}&lang=es&units=metric`;
  }

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=es&units=metric`;
  }

  const fetchWeather = async () => {
    const res = await fetch(url);
    return res.json();
  };
  const { data: weatherData } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
  });

  const winterConverter = (val) => {
    let calc = val * (3600 / 1) * (1 / 1000);
    return Math.floor(calc);
  };

  let arrayWeather;
  console.log(weatherData);
  if (weatherData) {
    arrayWeather = {
      weather: weatherData.weather[0].main,
      temp: parseFloat(weatherData.main.temp.toFixed(1)),
      wind: winterConverter(weatherData.wind.speed),
      ico: weatherData.weather[0].icon,
    };
  }

  /*
 
      */
  return (
    <section className="HomePage">
      <SelectionGarment
        {...{
          onClickGarment,
          infoGarment,
          onClickCombine,
          addColorButtonCombine,
          buttonDisabled,
        }}
      />
      <Weather {...{ toggleModalWeather, arrayWeather }} />

      <SelectionClothes
        {...{
          showGarments,
          OnClickClothes,
          showColors,
          divSwap,
          onClickColor,
          mobile,
          showMobileClothes,
        }}
      />
      <WeatherModal ref={refModal} {...{ toggleModalWeather, HandleModal }} />
    </section>
  );
}

/* <ErrorModal ref={refErrorModal}{...{toggleModalWeatherWeather, toggleModalWeatherError}}/>*/
