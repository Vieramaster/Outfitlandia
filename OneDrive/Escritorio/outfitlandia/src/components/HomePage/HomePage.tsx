import "./HomePage.css";
import React, { useState } from "react";
import { useDataBase } from "../arrayHooks/arrayHooks";
import SelectionClothes from "../SelectionClothes/SelectionClothes";
import SelectionGarment from "../SelectionGarment/SelectionGarment";
import Weather from "../Weather/Weather";

interface arrayFiltered {
  css: string;
  garment: string;
  image: string;
  name: string;
  style: [string, string];
  weather: [string, string];
}
interface garmentButtons {
  css: string;
  src: string;
  name: string;
  garment: string;
  nameButton: string;
  key: string;
}

interface HomePAgeProps {
  onGarmentClick: (id: string) => void;
  onClothesClick: (id: string) => void;
  arrayFiltered: arrayFiltered[];
  garmentButtons: garmentButtons[];
}

const HomePage: React.FC<HomePAgeProps> = () => {
  const [garmentClickId, setGarmentClickId] = useState("null");
  const [garmentCards, setGarmentCards] = useState([]);

  const defaultGarmentButtons = [
    {
      css: "big",
      src: "/src/images/default/top.webp",
      name: "default-top",
      garment: "top",
      nameButton: "parte superior",
      key: "default-top",
    },
    {
      css: "big",
      src: "/src/images/default/coat.webp",
      name: "default-coat",
      garment: "coat",
      nameButton: "abrigo",
      key: "default-coat",
    },
    {
      css: "big",
      src: "/src/images/default/pants.webp",
      name: "default-pants",
      garment: "pants",
      nameButton: "pantalones",
      key: "default-pants",
    },
    {
      css: "small",
      src: "/src/images/default/necklace.webp",
      name: "default-necklace",
      garment: "necklace",
      nameButton: "collar",
      key: "default-necklace",
    },
    {
      css: "small",
      src: "/src/images/default/watch.webp",
      name: "default-watch",
      garment: "watch",
      nameButton: "reloj",
      key: "default-watch",
    },
    {
      css: "small",
      src: "/src/images/default/belt.webp",
      name: "default-belt",
      garment: "belt",
      nameButton: "cinturón",
      key: "default-belt",
    },
    {
      css: "small",
      src: "/src/images/default/shoes.webp",
      name: "default-shoes",
      garment: "shoes",
      nameButton: "calzado",
      key: "default-shoes",
    },
  ];
  //setea si se usa los botones default o se actualizan
  const filteredGarmentButtons = defaultGarmentButtons;

  //sustraigo el id de selectionGarment
  const onGarmentClick = (id: string) => {
    setGarmentClickId(id);
  };

  const { data } = useDataBase();

  //mando para info para mapear SelectionClothes

  const arrayFiltered = data.filter((item) => item.garment === garmentClickId);

  const onClothesClick = (id: string) => {
    console.log(id);
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
          arrayFiltered={arrayFiltered}
          onClothesClick={onClothesClick}
        />
      </div>
    </section>
  );
};

export default HomePage;
