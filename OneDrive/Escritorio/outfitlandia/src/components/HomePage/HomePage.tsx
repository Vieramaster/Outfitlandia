import "./HomePage.css";
import React, { useState, useEffect } from "react";
import { useDataBase } from "../arrayHooks/arrayHooks";
import SelectionClothes from "../SelectionClothes/SelectionClothes";
import SelectionGarment from "../SelectionGarment/SelectionGarment";
import Weather from "../Weather/Weather";

export type filteredColorType = {
  colorName: string;
  hex: string;
  imgColor: string;
};
export type garmentButtonsType = {
  css: string;
  src: string;
  name: string;
  garment: string;
  nameButton: string;
  key: string;

}
export type clothesType = {
  garment: string;
  name: string;
  css: string;
  image: string;
  style: [string, string];
  weather: [string, string];
  colors: filteredColorType[];
};
export interface garmentButtons {
  css: string;
  src: string;
  name: string;
  garment: string;
  nameButton: string;
  key: string;

}

const HomePage = () => {
  const defaultGarmentButtons = [
    {
      css: "big",
      src: "/src/images/default/defaultTop.webp",
      name: "default-top",
      garment: "top",
      nameButton: "parte superior",
      key: "default-top",
    },
    {
      css: "big",
      src: "/src/images/default/defaultCoat.webp",
      name: "default-coat",
      garment: "coat",
      nameButton: "abrigo",
      key: "default-coat",
    },
    {
      css: "big",
      src: "/src/images/default/defaultPants.webp",
      name: "default-pants",
      garment: "pants",
      nameButton: "pantalones",
      key: "default-pants",
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
  const [garmentClickId, setGarmentClickId] = useState("");
  const [clothesClickId, setClothesClickId] = useState("");
  const [garmentCards, setGarmentCards] = useState<clothesType[]>([]);
  const [clothesElection, setClothesElection] = useState<clothesType[]>([]);
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
  



  //mando para info para mapear SelectionClothes



  //vuelve con el nombre de la prenda
  const onClothesClick = (id: string) => {
    setClothesClickId(id);
    setTimeout(() => {
      setShowButtonsBUtton(false);
      const garmentChoise = data.filter((item) => item.name === id);
      setClothesElection(garmentChoise)
    }, 200);
  };



  const onColorsClick = (id: string) => {
    setColorClick(id);

    setTimeout(()=>{
      //crea el nuevo objeto con el nuevo color
      const newGarment = clothesElection.map((item)=>{
        return{
          ...item,
          colors: colorClick
        }
      })

      const newButtonGarment = newGarment.map((item)=>{
        return {
          css: item.css,
          src: item.image,
          name: item.name,
          garment: item.garment,
          nameButton: item.name,
          key: item.name,
        };
      })

      const addNewButton = newGarment.map((itemOld) => {
        const itemNew = newButtonGarment.find((itemNew) => itemNew.name === itemOld.name);
        return itemNew ? itemNew : itemOld;
        
        
      });
      
    },200)
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
          clothesElection={clothesElection}
          onColorsClick={onColorsClick}
          showClothesButton={showClothesButton}
        />
      </div>
    </section>
  );
};

export default HomePage;
