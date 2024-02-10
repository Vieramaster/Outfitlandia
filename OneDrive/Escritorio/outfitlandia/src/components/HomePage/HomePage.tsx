import "./HomePage.css";
import React, { useState } from "react";
import {
  dataJsonTypes,
  dataColor,
  useDataBase,
  newColors,
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
  const [colorsElection, setColorsElection] = useState<newColors[]>([]);
  const [showClothesButton, setShowButtonsBUtton] = useState(false);
  const [colorClick, setColorClick] = useState("string");
  const [filteredGarmentButtons, setFilteredGarmentButtons] = useState(
    defaultGarmentButtons
  );
  const { data } = useDataBase();

  //sustraigo el id de selectionGarment
  const onGarmentClick = (id: string) => {
    setGarmentClickId(id);
    setTimeout(() => {
      setFilteredGarmentButtons(defaultGarmentButtons);
      //cambia el div
      setShowButtonsBUtton(true);
      //mando array nuevo con la prenda seleccionada al hijo 1
      const arrayFiltered = data.filter((item) => item.garment === id);
      setGarmentCards(arrayFiltered);
    }, 200);
  };

  const onClothesClick = (id: string) => {
    setClothesClickId(id);
    setTimeout(() => {
      setShowButtonsBUtton(false);
      const garmentChoise = data.find((item) => item.name === id);

      const colorFilter = garmentChoise
        ? dataColor.filter((item) =>
            garmentChoise.colors.includes(item.colorName)
          )
        : [];

      setColorsElection(colorFilter);
    }, 200);
  };

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
