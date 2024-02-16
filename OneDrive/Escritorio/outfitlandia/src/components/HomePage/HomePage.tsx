import "./HomePage.css";
import React, { useState } from "react";
import {
  dataJsonTypes,
  useDataBase,
  colorData,
} from "../arrayHooks/arrayHooks";
import SelectionClothes from "../SelectionClothes/SelectionClothes";
import SelectionGarment from "../SelectionGarment/SelectionGarment";
import Weather from "../Weather/Weather";

const HomePage = () => {
  const defaultGarmentButtons = [
    {
      css: "big",
      src: "/src/images/default/defaultTop.webp",
      name: "default-top",
      garment: "top",
      buttonName: "parte superior",
      key: "default-top",
    },
    {
      css: "big",
      src: "/src/images/default/defaultCoat.webp",
      name: "default-coat",
      garment: "coat",
      buttonName: "abrigo",
      key: "default-coat",
    },
    {
      css: "big",
      src: "/src/images/default/defaultPants.webp",
      name: "default-pants",
      garment: "pants",
      buttonName: "pantalones",
      key: "default-pants",
    },

    {
      css: "small",
      src: "/src/images/default/watch.webp",
      name: "default-watch",
      garment: "watch",
      buttonName: "reloj",
      key: "default-watch",
    },
    {
      css: "small",
      src: "/src/images/default/belt.webp",
      name: "default-belt",
      garment: "belt",
      buttonName: "cinturón",
      key: "default-belt",
    },
    {
      css: "shoes",
      src: "/src/images/default/shoes.webp",
      name: "default-shoes",
      garment: "shoes",
      buttonName: "calzado",
      key: "default-shoes",
    },
  ];
  const [garmentClickId, setGarmentClickId] = useState("");
  const [clothesClickId, setClothesClickId] = useState("");
  const [garmentCards, setGarmentCards] = useState<dataJsonTypes[]>([]);
  const [colorsElection, setColorsElection] = useState<colorData[]>([]);
  const [showClothesButton, setShowButtonsBUtton] = useState(false);
  const [colorClick, setColorClick] = useState("");
  const [filteredGarmentButtons, setFilteredGarmentButtons] = useState(
    defaultGarmentButtons
  );
  const { data } = useDataBase();

  //con el ID se prepara para buscar y mandar la nueva informacion a su segundo hijo, pero si se hace nuevamente click, reinicia gameCards
  const onGarmentClick = (id: string) => {
    setGarmentClickId(id);
    setTimeout(() => {
      setFilteredGarmentButtons(defaultGarmentButtons);

      setShowButtonsBUtton(true);

      const arrayFiltered = data.filter((item) => item.garment === id);
      setGarmentCards(arrayFiltered);
    }, 200);
  };

  // con el ID se busca el objeto del array y sus colores, se usa la parte "colors" para buscar info de dataColor y que devuelta nueva informacion, y con eso llevarla al segundo hijo nuevamente
  const onClothesClick = (id: string) => {
    setClothesClickId(id);
    setTimeout(() => {
      setShowButtonsBUtton(false);
      const garmentChoise = data.find((item) => item.name === id);

      const colorFilter = garmentChoise ? garmentChoise.colors : [];

      setColorsElection(colorFilter);
    }, 200);
  };

  //se utiliza la nueva informacion para actualizar las cards de selectionGarment segun el color que se elija,  se unifica las 2 busquedas para crear un objetos con los 2 resultados (prenda y color) para hacer la busqueda de combinaciones.
  const onColorsClick = (id: string) => {
    setColorClick(id);



    setTimeout(() => {}, 200);
  };

  return (
    <section className="HomePage">
      <div className="HomePage--box">
        <SelectionGarment
          garmentButtons={filteredGarmentButtons}
          onGarmentClick={onGarmentClick}
        />
        <Weather />
        <SelectionClothes
          garmentCards={garmentCards}
          onClothesClick={onClothesClick}
          colorsElection={colorsElection}
          onColorsClick={onColorsClick}
          showClothesButton={showClothesButton}
        />
      </div>
    </section>
  );
};

export default HomePage;
