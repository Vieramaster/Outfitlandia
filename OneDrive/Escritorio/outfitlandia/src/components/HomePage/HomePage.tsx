import "./HomePage.css";
import React, { useState, useEffect } from "react";
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


interface HomePAgeProps {
  arrayFiltered: arrayFiltered[];
}

const HomePage: React.FC<HomePAgeProps> = () => {
  const [garmentClickId, setGarmentClickId] = useState("");
  const [clothesClickId, setClothesClickId] = useState("");
  const [garmentCards, setGarmentCards] = useState([]);
  const [garmentElection, setGarmentElection] = useState([])




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

  useEffect(() => {
    if(garmentCards){
      const arrayFiltered = data.filter((item) => item.garment === garmentClickId);
      setGarmentCards(arrayFiltered);
    }
  }, [garmentClickId, data]);
  

  const onClothesClick =(id:string)=>{
    setClothesClickId(id)
  }

  useEffect(()=>{
    const  clothesElection= data.filter((item)=> item.name === clothesClickId)
    setGarmentElection(clothesElection)

  },[clothesClickId, data])



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
          garmentElection = {garmentElection}
          onColorsClick={onClothesClick}
        />
      </div>
    </section>
  );
};

export default HomePage;
